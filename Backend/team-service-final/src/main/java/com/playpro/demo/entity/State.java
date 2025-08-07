package com.playpro.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "state")
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer stid;

    private String stname;

    public State() {}

    public State(Integer stid, String stname) {
        this.stid = stid;
        this.stname = stname;
    }

    public Integer getStid() {
        return stid;
    }

    public void setStid(Integer stid) {
        this.stid = stid;
    }

    public String getStname() {
        return stname;
    }

    public void setStname(String stname) {
        this.stname = stname;
    }

    @Override
    public String toString() {
        return "State [stid=" + stid + ", stname=" + stname + "]";
    }
}
