package com.PlayProFootball.tournamentservice.repository;

import com.PlayProFootball.tournamentservice.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    List<Venue> findByTournamentId(Long tournamentId);
}
