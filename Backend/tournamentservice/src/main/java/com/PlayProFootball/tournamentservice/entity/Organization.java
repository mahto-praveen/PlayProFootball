package com.PlayProFootball.tournamentservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "organization")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int oid;

    private String name; 
}
