package com.PlayProFootball.tournamentservice.service;

import com.PlayProFootball.tournamentservice.dto.TournamentDTO;
import com.PlayProFootball.tournamentservice.entity.Tournament;
import com.PlayProFootball.tournamentservice.repository.TournamentRepository;
import com.PlayProFootball.tournamentservice.util.JwtUtil;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TournamentService {

    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private JwtUtil jwtUtil;

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
    public TournamentDTO updateTournament(Long id, TournamentDTO dto, Principal principal) {
        Tournament existing = findById(id);

        // Extract org ID from JWT
        Integer myOrgId = jwtUtil.extractOrganizationId(principal);
        if (existing.getOrganization().getOid() != myOrgId) {
            throw new AccessDeniedException("Not allowed to edit this tournament");
        }

        // Copy editable fields
        existing.setName(dto.getName());
        existing.setDescription(dto.getDescription());
        existing.setCity(dto.getCity());
        existing.setStartDate(dto.getStartDate());
        existing.setEndDate(dto.getEndDate());
        existing.setType(dto.getType());
        existing.setRegistrationDeadline(dto.getRegistrationDeadline());
        // Add more editable fields here if needed

        Tournament saved = tournamentRepository.save(existing);
        return convertToDTO(saved);
    }

    // Convert entity to DTO and determine status
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
                .registrationDeadline(t.getRegistrationDeadline())
                .status(status)
                .isPublished(t.isPublished())
                .organizationId(t.getOrganization() != null ? t.getOrganization().getOid() : null)
                .build();
    }
}
