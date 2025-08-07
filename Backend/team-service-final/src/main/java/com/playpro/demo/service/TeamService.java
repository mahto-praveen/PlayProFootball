package com.playpro.demo.service;

import java.util.List;

import com.playpro.demo.dto.CreateTeamRequest;
import com.playpro.demo.dto.TeamDTO;
import com.playpro.demo.dto.TeamDetailsDTO;
import com.playpro.demo.dto.UpdateTeamRequest;

public interface TeamService {

    List<TeamDTO> getAllTeams(String name, String manager, Integer cityId);

    TeamDetailsDTO getTeamDetails(Integer teamId);

    void createTeam(CreateTeamRequest request);

    void updateTeam(Integer teamId, UpdateTeamRequest request);

    void deleteTeam(Integer teamId);
}
