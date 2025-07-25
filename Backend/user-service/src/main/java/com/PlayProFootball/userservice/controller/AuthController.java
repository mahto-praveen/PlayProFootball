package com.PlayProFootball.userservice.controller;

import com.PlayProFootball.userservice.dto.*;
import com.PlayProFootball.userservice.entity.User;
import com.PlayProFootball.userservice.repository.UserRepository;
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
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
    	System.out.println("Register API hit: " + request.getUsername());
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
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
    public ResponseEntity<String> getUserProfile(@RequestHeader("Authorization") String token) {
        if (!token.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid Token Format");
        }
        token = token.substring(7); // Remove "Bearer " prefix

        if (jwtUtils.validateToken(token)) {
            String username = jwtUtils.extractUsername(token);
            return ResponseEntity.ok("Welcome " + username + " 👋");
        } else {
            return ResponseEntity.status(401).body("Invalid Token ❌");
        }
    }



}
