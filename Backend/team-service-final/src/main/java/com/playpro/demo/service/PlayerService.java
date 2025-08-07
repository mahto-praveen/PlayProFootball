package com.playpro.demo.service;

import com.playpro.demo.dto.PlayerDTO;
import com.playpro.demo.entity.Player;

import java.util.List;

public interface PlayerService {
    void addPlayerToTeam(PlayerDTO playerDTO);
    void assignPlayerToTeam(Integer playerId, Integer teamId);
    List<Player> getAllPlayers(); // Optional
    Player getPlayerById(Integer playerId); // ✅ This was missing
}
