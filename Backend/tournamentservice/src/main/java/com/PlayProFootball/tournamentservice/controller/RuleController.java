package com.PlayProFootball.tournamentservice.controller;

import com.PlayProFootball.tournamentservice.entity.Rule;
import com.PlayProFootball.tournamentservice.repository.RuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rules")
@CrossOrigin(origins = "http://localhost:5173")
public class RuleController {

    @Autowired
    private RuleRepository ruleRepository;

    @PostMapping
    public Rule createRule(@RequestBody Rule rule) {
        return ruleRepository.save(rule);
    }

    @GetMapping("/tournament/{tournamentId}")
    public List<Rule> getRulesByTournament(@PathVariable Long tournamentId) {
        return ruleRepository.findByTournamentId(tournamentId);
    }
}
