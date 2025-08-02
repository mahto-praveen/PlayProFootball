package com.PlayProFootball.tournamentservice.repository;

import com.PlayProFootball.tournamentservice.entity.Tournament;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TournamentRepository extends JpaRepository<Tournament, Long> {
}
