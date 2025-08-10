package com.PlayProFootball.tournamentservice.dto;

import java.time.LocalDate;

import com.PlayProFootball.tournamentservice.entity.TournamentType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TournamentDTO {

    private Long id;
    private String name;
    private String description;

    private Integer stateId;
    private String stateName;

    private String city;

    private LocalDate startDate;
    private LocalDate endDate;

    private TournamentType type;

    private String status;
    private boolean isPublished;
    
    private Integer organizationId;

    
    private LocalDate registrationDeadline;


}
