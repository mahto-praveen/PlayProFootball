package com.PlayProFootball.tournamentservice.controller;

import com.PlayProFootball.tournamentservice.entity.Rule;
import com.PlayProFootball.tournamentservice.entity.Tournament;
import com.PlayProFootball.tournamentservice.repository.RuleRepository;
import com.PlayProFootball.tournamentservice.repository.TournamentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rules")
@CrossOrigin(origins = "http://localhost:5173")
public class RuleController {

    @Autowired
    private RuleRepository ruleRepository;

    @Autowired
    private TournamentRepository tournamentRepository;

    @PostMapping("/{tournamentId}")
    public Rule addRuleToTournament(@PathVariable Long tournamentId, @RequestBody Rule rule) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));
        rule.setTournament(tournament);
        return ruleRepository.save(rule);
    }

    @GetMapping("/{tournamentId}")
    public List<Rule> getRulesByTournament(@PathVariable Long tournamentId) {
        return ruleRepository.findByTournamentId(tournamentId);
    }
}
