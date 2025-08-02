package com.PlayProFootball.tournamentservice.repository;

import com.PlayProFootball.tournamentservice.entity.Rule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RuleRepository extends JpaRepository<Rule, Long> {
    List<Rule> findByTournamentId(Long tournamentId);
}
