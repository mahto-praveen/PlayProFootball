package com.PlayProFootball.tournamentservice.controller;

import com.PlayProFootball.tournamentservice.entity.Tournament;
import com.PlayProFootball.tournamentservice.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tournaments")
@CrossOrigin(origins = "http://localhost:5173")
public class TournamentController {

    @Autowired
    private TournamentRepository tournamentRepository;

    @PostMapping
    public Tournament createTournament(@RequestBody Tournament tournament) {
        return tournamentRepository.save(tournament);
    }

    @GetMapping
    public List<Tournament> getAllTournaments() {
    	System.out.println("GET /api/tournaments called");
        return tournamentRepository.findAll();
    }
}
