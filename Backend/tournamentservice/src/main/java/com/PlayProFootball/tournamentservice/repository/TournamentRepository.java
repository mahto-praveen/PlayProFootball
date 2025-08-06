package com.PlayProFootball.tournamentservice.repository;

import com.PlayProFootball.tournamentservice.entity.Tournament;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TournamentRepository extends JpaRepository<Tournament, Long> {
    List<Tournament> findByIsPublishedTrue();
    List<Tournament> findByOrganizationOid(int oid);

}
