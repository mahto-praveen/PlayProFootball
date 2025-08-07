package com.playpro.demo.repository;

import com.playpro.demo.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Integer> {  // ✅ FIXED: Integer not Long

    List<Team> findByNameContainingIgnoreCase(String name);
    List<Team> findByManagerNameContainingIgnoreCase(String managerName);
    List<Team> findByCity_Cityid(Integer cityId);
}
