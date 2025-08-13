package com.PlayProFootball.userservice.service;

import com.PlayProFootball.userservice.dto.RegisterRequest;
import com.PlayProFootball.userservice.entity.Organization;
import com.PlayProFootball.userservice.entity.User;
import com.PlayProFootball.userservice.repository.OrganizationRepository;
import com.PlayProFootball.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;
    private final PasswordEncoder passwordEncoder;

    public void register(RegisterRequest request) {
        Long orgId = null;

        // If role is ORGANIZER (2) and organization name is given, create org
        if (request.getRole() == 2 
                && request.getOrganizationName() != null 
                && !request.getOrganizationName().isEmpty()) {

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
    }
}
