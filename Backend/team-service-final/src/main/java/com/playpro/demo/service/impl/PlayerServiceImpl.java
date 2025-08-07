package com.playpro.demo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.playpro.demo.dto.PlayerDTO;
import com.playpro.demo.entity.Player;
import com.playpro.demo.entity.Team;
import com.playpro.demo.repository.PlayerRepository;
import com.playpro.demo.repository.TeamRepository;
import com.playpro.demo.service.PlayerService;

import java.util.List;

@Service
public class PlayerServiceImpl implements PlayerService {

    @Autowired
    private PlayerRepository playerRepo;

    @Autowired
    private TeamRepository teamRepo;

    // ✅ Add a new player to a team
    @Override
    public void addPlayerToTeam(PlayerDTO dto) {
        Team team = teamRepo.findById(dto.getTeamId())
            .orElseThrow(() -> new RuntimeException("Team not found"));

        Player player = new Player();
        player.setName(dto.getName());
        player.setAge(dto.getAge());
        player.setPosition(dto.getPosition());
        player.setTeam(team);

        playerRepo.save(player);
    }

    // ✅ Assign an existing player to a new team
    @Override
    public void assignPlayerToTeam(Integer playerId, Integer teamId) {
        Player player = playerRepo.findById(playerId)
            .orElseThrow(() -> new RuntimeException("Player not found"));

        Team team = teamRepo.findById(teamId)
            .orElseThrow(() -> new RuntimeException("Team not found"));

        player.setTeam(team);
        playerRepo.save(player);
    }

    // ✅ Get player by ID (used in GET /api/players/{id})
    @Override
    public Player getPlayerById(Integer playerId) {
        return playerRepo.findById(playerId)
            .orElseThrow(() -> new RuntimeException("Player not found with ID: " + playerId));
    }

    // ✅ Get all players (optional for listing)
    @Override
    public List<Player> getAllPlayers() {
        return playerRepo.findAll();
    }
}
