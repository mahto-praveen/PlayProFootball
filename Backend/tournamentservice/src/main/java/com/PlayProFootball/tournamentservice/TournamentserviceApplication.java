package com.PlayProFootball.tournamentservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//@SpringBootApplication
@SpringBootApplication(scanBasePackages = "com.PlayProFootball")

public class TournamentserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TournamentserviceApplication.class, args);
	}

}
