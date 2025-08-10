package com.PlayProFootball.tournamentservice.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PlayProFootball.tournamentservice.dto.TournamentDTO;
import com.PlayProFootball.tournamentservice.entity.Tournament;
import com.PlayProFootball.tournamentservice.repository.TournamentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TournamentService {

    @Autowired
    private TournamentRepository tournamentRepository;


    // Save a tournament
    public Tournament saveTournament(Tournament tournament) {
        return tournamentRepository.save(tournament);
    }

    // Fetch all published tournaments with status
    public List<TournamentDTO> getAllTournamentsWithStatus() {
        return tournamentRepository.findAll()
                .stream()
                .filter(Tournament::isPublished)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Fetch all tournaments by org ID
    public List<TournamentDTO> getTournamentsByOrganizationId(int orgId) {
        return tournamentRepository.findByOrganizationOid(orgId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Publish tournament
    public String publishTournament(Long id) {
        Tournament t = findById(id);
        t.setPublished(true);
        tournamentRepository.save(t);
        return "Tournament published";
    }

    // Unpublish tournament
    public String unpublishTournament(Long id) {
        Tournament t = findById(id);
        t.setPublished(false);
        tournamentRepository.save(t);
        return "Tournament unpublished";
    }

    // Find entity by ID
    public Tournament findById(Long id) {
        return tournamentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tournament not found"));
    }

    // Get tournament DTO by ID
    public TournamentDTO getTournamentDTOById(Long id) {
        Tournament t = findById(id);
        return convertToDTO(t);
    }

    // Update tournament with ownership validation
    public TournamentDTO updateTournament(Long id, TournamentDTO dto) {
        Tournament existing = findById(id);


        // Copy editable fields
        existing.setName(dto.getName());
        existing.setDescription(dto.getDescription());
        existing.setCity(dto.getCity());
        existing.setStartDate(dto.getStartDate());
        existing.setEndDate(dto.getEndDate());
        existing.setType(dto.getType());
        existing.setRegistrationDeadline(dto.getRegistrationDeadline());

        Tournament saved = tournamentRepository.save(existing);
        return convertToDTO(saved);
    }

    private TournamentDTO convertToDTO(Tournament t) {
        LocalDate today = LocalDate.now();
        String status;

        if (today.isBefore(t.getStartDate())) {
            status = "Upcoming";
        } else if (!today.isAfter(t.getEndDate())) {
            status = "Ongoing";
        } else {
            status = "Finished";
        }

        int stateId = 0;
        String stateName = null;
        if (t.getState() != null) {
            stateId = t.getState().getId();
            stateName = t.getState().getName();
        }

        return TournamentDTO.builder()
                .id(t.getId())
                .name(t.getName())
                .description(t.getDescription())
                .stateId(stateId)
                .stateName(stateName)
                .city(t.getCity())
                .startDate(t.getStartDate())
                .endDate(t.getEndDate())
                .type(t.getType())
                .registrationDeadline(t.getRegistrationDeadline())
                .status(status)
                .isPublished(t.isPublished())
                .organizationId(t.getOrganization() != null ? t.getOrganization().getOid() : null)
                .build();
    }

}
