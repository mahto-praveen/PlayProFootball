package com.playpro.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.playpro.demo.dto.CreateTeamRequest;
import com.playpro.demo.dto.TeamDTO;
import com.playpro.demo.dto.TeamDetailsDTO;
import com.playpro.demo.dto.UpdateTeamRequest;
import com.playpro.demo.service.TeamService;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
@CrossOrigin(origins = "http://localhost:3000")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping
    public List<TeamDTO> getAllTeams(@RequestParam(required = false) String name,
                                     @RequestParam(required = false) String manager,
                                     @RequestParam(required = false) Integer cityId) { // ✅ Fixed
        return teamService.getAllTeams(name, manager, cityId);
    }

    @GetMapping("/{id}")
    public TeamDetailsDTO getTeamDetails(@PathVariable Integer id) { // ✅ Fixed
        return teamService.getTeamDetails(id);
    }

    @PostMapping
    public String createTeam(@RequestBody CreateTeamRequest request) {
        teamService.createTeam(request);
        return "Team created successfully";
    }

    @PutMapping("/{id}")
    public String updateTeam(@PathVariable Integer id, @RequestBody UpdateTeamRequest request) { // ✅ Fixed
        teamService.updateTeam(id, request);
        return "Team updated successfully";
    }

    @DeleteMapping("/{id}")
    public String deleteTeam(@PathVariable Integer id) { // ✅ Fixed
        teamService.deleteTeam(id);
        return "Team deleted successfully";
    }
}
