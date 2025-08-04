package com.PlayProFootball.tournamentservice.service;

import com.PlayProFootball.tournamentservice.entity.State;
import com.PlayProFootball.tournamentservice.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StateService {
    @Autowired private StateRepository stateRepo;

    public List<State> getAllStates() {
        return stateRepo.findAll();
    }
}
