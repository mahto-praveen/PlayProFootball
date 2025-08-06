package com.PlayProFootball.tournamentservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "state")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class State {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;
}
