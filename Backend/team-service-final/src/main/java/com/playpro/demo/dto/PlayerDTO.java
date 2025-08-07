package com.playpro.demo.dto;

public class PlayerDTO {

    private String name;
    private Integer age;
    private String position;

    // Corrected: teamId type to match entity
    private Integer teamId;

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

    public Integer getTeamId() {
        return teamId;
    }

    public void setTeamId(Integer teamId) {  
        this.teamId = teamId;
    }
}
