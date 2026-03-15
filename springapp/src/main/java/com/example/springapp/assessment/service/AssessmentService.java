package com.example.springapp.assessment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.assessment.entity.Assessment;
import com.example.springapp.assessment.repository.AssessmentRepository;

@Service
public class AssessmentService {

    @Autowired
    AssessmentRepository repo;

    public Assessment analyze(Assessment assessment) {

        // Skin type logic
        if (assessment.isOilySkin()) {
            assessment.setSkinType("Oily");
        } 
        else if (assessment.isDrySkin()) {
            assessment.setSkinType("Dry");
        } 
        else {
            assessment.setSkinType("Normal");
        }

        // Hair type logic
        if (assessment.isDandruff()) {
            assessment.setHairType("Dry Hair");
        } 
        else {
            assessment.setHairType("Normal Hair");
        }

        return repo.save(assessment);
    }
}