package com.PlayProFootball.userservice.controller;

import com.PlayProFootball.userservice.dto.*;
import com.PlayProFootball.userservice.entity.User;
import com.PlayProFootball.userservice.entity.Organization;
import com.PlayProFootball.userservice.repository.UserRepository;
import com.PlayProFootball.userservice.repository.OrganizationRepository;
import com.PlayProFootball.userservice.security.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
    	System.out.println("Register API hit: " + request.getUsername());
    	Long orgId = null;

        // If role is ORGANIZER (role = 2), create organization
        if (request.getRole() == 2 && request.getOrganizationName() != null && !request.getOrganizationName().isEmpty()) {
            Organization org = Organization.builder()
                    .name(request.getOrganizationName())
                    .build();
            org = organizationRepository.save(org);
            orgId = org.getId();
        }
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .email(request.getEmail())
                .phoneno(request.getPhoneno())
                .organizationId(orgId)
                .enabled(true)
                .build();

        userRepository.save(user);

        String token = jwtUtils.generateToken(user);
        return ResponseEntity.ok(new AuthResponse(token, user.getRole()));
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtils.generateToken(user);
        return ResponseEntity.ok(new AuthResponse(token, user.getRole()));
    }
    
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String authHeader) {
        // 1. Validate header format
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity
                    .badRequest()
                    .body("Invalid Token Format");
        }

        String token = authHeader.substring(7);
        // 2. Validate token
        if (!jwtUtils.validateToken(token)) {
            return ResponseEntity
                    .status(401)
                    .body("Invalid or expired token");
        }

        // 3. Extract username from token
        String username = jwtUtils.extractUsername(token);

        // 4. Look up user in the database
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> 
                    // 5. If not found, return 404
                    new RuntimeException("User not found")
                );

        // 6. Map to DTO
        UserProfileDto dto = UserProfileDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phoneno(user.getPhoneno())
                .role(user.getRole())
                .build();

        // 7. Return 200 + JSON body
        return ResponseEntity.ok(dto);
    }



}
