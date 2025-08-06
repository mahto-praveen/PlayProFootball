package com.PlayProFootball.userservice.entity;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private int role;
    private boolean enabled;

    private String email;
    private Long phoneno;
    @Column(name = "organization_id")
    private Long organizationId;

}
