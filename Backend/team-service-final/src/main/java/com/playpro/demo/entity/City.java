package com.playpro.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "city")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cityid;

    private String cityname;

    @ManyToOne
    @JoinColumn(name = "stid")
    private State state;

    public City(Integer cityid, String cityname, State state) {
        this.cityid = cityid;
        this.cityname = cityname;
        this.state = state;
    }

    public City() {}

    public Integer getCityid() {
        return cityid;
    }

    public void setCityid(Integer cityid) {
        this.cityid = cityid;
    }

    public String getCityname() {
        return cityname;
    }

    public void setCityname(String cityname) {
        this.cityname = cityname;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "City [cityid=" + cityid + ", cityname=" + cityname + ", state=" + state + "]";
    }
}
