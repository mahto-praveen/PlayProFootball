package com.PlayProFootball.tournamentservice.dto;

import lombok.*;
import java.time.LocalDate;
import com.PlayProFootball.tournamentservice.entity.TournamentType;

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
}
