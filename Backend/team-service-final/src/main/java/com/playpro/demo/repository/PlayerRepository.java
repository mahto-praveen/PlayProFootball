package com.playpro.demo.repository;

import com.playpro.demo.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
    List<Player> findByTeam_TeamId(Integer teamId);
}
