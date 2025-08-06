package com.PlayProFootball.tournamentservice.controller;

import com.PlayProFootball.tournamentservice.entity.State;
import com.PlayProFootball.tournamentservice.service.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/states")
@CrossOrigin(origins = "http://localhost:5173")
public class StateController {
    @Autowired private StateService stateService;

    @GetMapping
    public List<State> listStates() {
        return stateService.getAllStates();
    }
}
