package com.PlayProFootball.tournamentservice.controller;

import com.PlayProFootball.tournamentservice.dto.TournamentDTO;
import com.PlayProFootball.tournamentservice.entity.Tournament;
import com.PlayProFootball.tournamentservice.service.TournamentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
@RestController
@RequestMapping("/api/tournaments")
@CrossOrigin(origins = "http://localhost:5173")
public class TournamentController {

    @Autowired
    private TournamentService tournamentService;

    @PostMapping
    public Tournament createTournament(@RequestBody Tournament tournament) {
        return tournamentService.saveTournament(tournament);
    }

    @GetMapping
    public List<TournamentDTO> getTournaments(@RequestParam(value = "orgId", required = false) Integer orgId) {
        if (orgId != null) {
            return tournamentService.getTournamentsByOrganizationId(orgId);
        } else {
            return tournamentService.getAllTournamentsWithStatus();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TournamentDTO> getTournamentById(@PathVariable Long id) {
        TournamentDTO dto = tournamentService.getTournamentDTOById(id);
        return ResponseEntity.ok(dto);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TournamentDTO> updateTournament(
          @PathVariable Long id,
          @RequestBody TournamentDTO dto,
          Principal principal      // JWT-authenticated user
    ) {
        TournamentDTO updated = tournamentService.updateTournament(id, dto, principal);
        return ResponseEntity.ok(updated);
    }


    @PutMapping("/{id}/publish")
    public ResponseEntity<String> publishTournament(@PathVariable Long id) {
        return ResponseEntity.ok(tournamentService.publishTournament(id));
    }

    @PutMapping("/{id}/unpublish")
    public ResponseEntity<String> unpublishTournament(@PathVariable Long id) {
        return ResponseEntity.ok(tournamentService.unpublishTournament(id));
    }
}
