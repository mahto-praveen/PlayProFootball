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
                .filter(Tournament::isPublished)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public String publishTournament(Long id) {
        Tournament t = tournamentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));
        t.setPublished(true);
        tournamentRepository.save(t);
        return "Tournament published";
    }

    public String unpublishTournament(Long id) {
        Tournament t = tournamentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));
        t.setPublished(false);
        tournamentRepository.save(t);
        return "Tournament unpublished";
    }



    private TournamentDTO convertToDTO(Tournament t) {
        LocalDate today = LocalDate.now();
        String status;
        if (today.isBefore(t.getStartDate()))       status = "Upcoming";
        else if (!today.isAfter(t.getEndDate()))    status = "Ongoing";
        else                                        status = "Finished";

        return TournamentDTO.builder()
                .id(t.getId())
                .name(t.getName())
                .description(t.getDescription())
                .stateId(t.getState().getId())
                .stateName(t.getState().getName())
                .city(t.getCity())
                .startDate(t.getStartDate())
                .endDate(t.getEndDate())
                .type(t.getType())
                .status(status)
                .isPublished(t.isPublished())
                .build();
    }




}
