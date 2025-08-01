package com.PlayProFootball.tournamentservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Venue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String city;
    private String state;
    private String address;
    private int capacity;

    @ManyToOne
    @JoinColumn(name = "tournament_id")
    private Tournament tournament;
}
