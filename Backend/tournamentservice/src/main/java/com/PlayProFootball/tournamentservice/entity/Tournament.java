package com.PlayProFootball.tournamentservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tournament")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tournament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String location;
    private String startDate;
    private String endDate;

    @Enumerated(EnumType.STRING)
    private TournamentType type;
}
