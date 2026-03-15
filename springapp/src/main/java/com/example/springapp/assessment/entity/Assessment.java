package com.example.springapp.assessment.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String userEmail;

    private String skinType;
    private String hairType;

    private boolean oilySkin;
    private boolean drySkin;
    private boolean acne;
    private boolean dandruff;

    public Assessment() {}

    public int getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getSkinType() {
        return skinType;
    }

    public String getHairType() {
        return hairType;
    }

    public boolean isOilySkin() {
        return oilySkin;
    }

    public boolean isDrySkin() {
        return drySkin;
    }

    public boolean isAcne() {
        return acne;
    }

    public boolean isDandruff() {
        return dandruff;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setSkinType(String skinType) {
        this.skinType = skinType;
    }

    public void setHairType(String hairType) {
        this.hairType = hairType;
    }

    public void setOilySkin(boolean oilySkin) {
        this.oilySkin = oilySkin;
    }

    public void setDrySkin(boolean drySkin) {
        this.drySkin = drySkin;
    }

    public void setAcne(boolean acne) {
        this.acne = acne;
    }

    public void setDandruff(boolean dandruff) {
        this.dandruff = dandruff;
    }
}