package com.example.springapp.skinanalysis.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SkinImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String userEmail;

    private String imagePath;

    private String predictedSkinType;

    public SkinImage() {}

    public int getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getImagePath() {
        return imagePath;
    }

    public String getPredictedSkinType() {
        return predictedSkinType;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public void setPredictedSkinType(String predictedSkinType) {
        this.predictedSkinType = predictedSkinType;
    }
}