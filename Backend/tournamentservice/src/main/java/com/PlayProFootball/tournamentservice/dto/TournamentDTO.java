package com.PlayProFootball.tournamentservice.dto;

import java.time.LocalDate;

import com.PlayProFootball.tournamentservice.entity.TournamentType;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TournamentDTO {
    private Long id;
    private String name;
    private String description;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private TournamentType type;
    private String status;
}
