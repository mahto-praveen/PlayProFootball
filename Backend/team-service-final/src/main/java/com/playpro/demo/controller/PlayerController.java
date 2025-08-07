package com.playpro.demo.controller;

import com.playpro.demo.dto.PlayerDTO;
import com.playpro.demo.entity.Player;
import com.playpro.demo.service.PlayerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "http://localhost:3000")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @PostMapping
    public String addPlayer(@RequestBody PlayerDTO playerDTO) {
        playerService.addPlayerToTeam(playerDTO);
        return "Player added to team";
    }

    @PutMapping("/{playerId}/assign/{teamId}")
    public String assignPlayerToTeam(@PathVariable Integer playerId, @PathVariable Integer teamId) {
        playerService.assignPlayerToTeam(playerId, teamId);
        return "Player assigned to team successfully";
    }

    @GetMapping
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    // ✅ This one was missing:
    @GetMapping("/{playerId}")
    public Player getPlayerById(@PathVariable Integer playerId) {
        return playerService.getPlayerById(playerId);
    }
}
