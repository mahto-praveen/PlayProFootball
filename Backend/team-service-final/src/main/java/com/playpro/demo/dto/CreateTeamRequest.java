package com.playpro.demo.dto;

import java.util.List;

public class CreateTeamRequest {

    private String teamName;
    private String managerName;
    private String phone;
    private Integer cityId;  // ✅ Correct type

    private List<PlayerDTO> players;

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

    public Integer getCityId() {  // ✅ Fixed
        return cityId;
    }

    public void setCityId(Integer cityId) {  // ✅ Fixed
        this.cityId = cityId;
    }

    public List<PlayerDTO> getPlayers() {
        return players;
    }

    public void setPlayers(List<PlayerDTO> players) {
        this.players = players;
    }
}
