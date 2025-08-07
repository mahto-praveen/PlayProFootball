package com.playpro.demo.service.impl;

import com.playpro.demo.dto.CreateTeamRequest;
import com.playpro.demo.dto.TeamDTO;
import com.playpro.demo.dto.TeamDetailsDTO;
import com.playpro.demo.dto.UpdateTeamRequest;
import com.playpro.demo.entity.Player;
import com.playpro.demo.entity.Team;
import com.playpro.demo.repository.CityRepository;
import com.playpro.demo.repository.PlayerRepository;
import com.playpro.demo.repository.TeamRepository;
import com.playpro.demo.service.TeamService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeamServiceImpl implements TeamService {

    @Autowired
    private TeamRepository teamRepo;

    @Autowired
    private PlayerRepository playerRepo;

    @Autowired
    private CityRepository cityRepo;

    @Override
    public List<TeamDTO> getAllTeams(String name, String manager, Integer cityId) {
        List<Team> teams;

        if (name != null) {
            teams = teamRepo.findByNameContainingIgnoreCase(name);
        } else if (manager != null) {
            teams = teamRepo.findByManagerNameContainingIgnoreCase(manager);
        } else if (cityId != null) {
            teams = teamRepo.findByCity_Cityid(cityId);
        } else {
            teams = teamRepo.findAll();
        }

        List<TeamDTO> teamDTOList = new ArrayList<>();

        for (Team team : teams) {
            TeamDTO dto = new TeamDTO();
            dto.setTeamId(team.getTeamId());
            dto.setTeamName(team.getName());
            dto.setManagerName(team.getManagerName());
            dto.setPhone(team.getPhone());
            dto.setCityName(team.getCity().getCityname());
            dto.setPlayerCount(team.getPlayers() != null ? team.getPlayers().size() : 0);
            teamDTOList.add(dto);
        }

        return teamDTOList;
    }

    @Override
    public TeamDetailsDTO getTeamDetails(Integer teamId) {
        Team team = teamRepo.findById(teamId)
            .orElseThrow(() -> new RuntimeException("Team not found with ID: " + teamId));

        TeamDetailsDTO dto = new TeamDetailsDTO();
        dto.setTeamId(team.getTeamId());
        dto.setTeamName(team.getName());
        dto.setManagerName(team.getManagerName());
        dto.setPhone(team.getPhone());
        dto.setCityName(team.getCity().getCityname());

        List<TeamDetailsDTO.PlayerInfo> playerList = new ArrayList<>();

        for (Player p : team.getPlayers()) {
            TeamDetailsDTO.PlayerInfo info = new TeamDetailsDTO.PlayerInfo();
            info.setName(p.getName());
            info.setAge(p.getAge());
            info.setPosition(p.getPosition());
            playerList.add(info);
        }

        dto.setPlayers(playerList);
        return dto;
    }

    @Override
    public void createTeam(CreateTeamRequest request) {
        Team team = new Team();
        team.setName(request.getTeamName());
        team.setManagerName(request.getManagerName());
        team.setPhone(request.getPhone());
        team.setCity(cityRepo.findById(request.getCityId())
            .orElseThrow(() -> new RuntimeException("City not found")));

        List<Player> playerList = new ArrayList<>();

        for (com.playpro.demo.dto.PlayerDTO p : request.getPlayers()) {
            Player player = new Player();
            player.setName(p.getName());
            player.setAge(p.getAge());
            player.setPosition(p.getPosition());
            player.setTeam(team);
            playerList.add(player);
        }

        team.setPlayers(playerList);
        teamRepo.save(team);
    }

    @Override
    public void updateTeam(Integer teamId, UpdateTeamRequest request) {
        Team team = teamRepo.findById(teamId)
            .orElseThrow(() -> new RuntimeException("Team not found with ID: " + teamId));

        team.setName(request.getTeamName());
        team.setManagerName(request.getManagerName());
        team.setPhone(request.getPhone());
        team.setCity(cityRepo.findById(request.getCityId())
            .orElseThrow(() -> new RuntimeException("City not found")));

        teamRepo.save(team);
    }

    @Override
    public void deleteTeam(Integer teamId) {
        if (!teamRepo.existsById(teamId)) {
            throw new RuntimeException("Team not found with ID: " + teamId);
        }
        teamRepo.deleteById(teamId);
    }
}
