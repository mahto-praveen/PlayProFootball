package com.playpro.demo.dto;

import java.util.List;

public class TeamDetailsDTO {

    private Integer teamId;
    private String teamName;
    private String managerName;
    private String phone;
    private String cityName;

    private List<PlayerInfo> players;

    
    public static class PlayerInfo {
        private String name;
        private Integer age;
        private String position;
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public Integer getAge() {
			return age;
		}
		public void setAge(Integer age) {
			this.age = age;
		}
		public String getPosition() {
			return position;
		}
		public void setPosition(String position) {
			this.position = position;
		}

        // Getters and Setters
    }

	public Integer getTeamId() {
		return teamId;
	}

	public void setTeamId(Integer integer) {
		this.teamId = integer;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public String getManagerName() {
		return managerName;
	}

	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public List<PlayerInfo> getPlayers() {
		return players;
	}

	public void setPlayers(List<PlayerInfo> players) {
		this.players = players;
	}

    // Getters and Setters
}
