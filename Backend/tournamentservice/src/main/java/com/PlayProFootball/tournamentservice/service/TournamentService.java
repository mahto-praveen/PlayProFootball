package com.PlayProFootball.tournamentservice.service;

import com.PlayProFootball.tournamentservice.dto.TournamentDTO;
import com.PlayProFootball.tournamentservice.entity.Tournament;
import com.PlayProFootball.tournamentservice.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TournamentService {

    @Autowired
    private TournamentRepository tournamentRepository;

    public Tournament saveTournament(Tournament tournament) {
        return tournamentRepository.save(tournament);
    }

    public List<TournamentDTO> getAllTournamentsWithStatus() {
        return tournamentRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private TournamentDTO convertToDTO(Tournament tournament) {
        TournamentDTO dto = new TournamentDTO();
        dto.setId(tournament.getId());
        dto.setName(tournament.getName());
        dto.setDescription(tournament.getDescription());
        dto.setLocation(tournament.getLocation());
        dto.setStartDate(tournament.getStartDate());
        dto.setEndDate(tournament.getEndDate());
        dto.setType(tournament.getType());

        LocalDate today = LocalDate.now();
        if (today.isBefore(tournament.getStartDate())) {
            dto.setStatus("Upcoming");
        } else if (!today.isAfter(tournament.getEndDate())) {
            dto.setStatus("Ongoing");
        } else {
            dto.setStatus("Finished");
        }

        return dto;
    }


}
