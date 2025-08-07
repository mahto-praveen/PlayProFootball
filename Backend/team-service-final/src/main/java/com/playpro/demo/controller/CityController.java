package com.playpro.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.playpro.demo.entity.City;
import com.playpro.demo.repository.CityRepository;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
@CrossOrigin(origins = "http://localhost:3000")
public class CityController {

    @Autowired
    private CityRepository cityRepo;

    @GetMapping
    public List<City> getAllCities() {
        return cityRepo.findAll();
    }
}
