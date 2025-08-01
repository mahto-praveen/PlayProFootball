package com.PlayProFootball.tournamentservice.controller;

import com.PlayProFootball.tournamentservice.entity.Tournament;
import com.PlayProFootball.tournamentservice.entity.Venue;
import com.PlayProFootball.tournamentservice.repository.TournamentRepository;
import com.PlayProFootball.tournamentservice.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/venues")
@CrossOrigin(origins = "http://localhost:5173")
public class VenueController {

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private TournamentRepository tournamentRepository;

    @PostMapping("/{tournamentId}")
    public Venue addVenue(@PathVariable Long tournamentId, @RequestBody Venue venue) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));
        venue.setTournament(tournament);
        return venueRepository.save(venue);
    }

    @GetMapping
    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    @GetMapping("/tournament/{tournamentId}")
    public List<Venue> getVenuesByTournament(@PathVariable Long tournamentId) {
        return venueRepository.findByTournamentId(tournamentId);
    }
}
