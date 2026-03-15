package com.example.springapp.assessment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.assessment.entity.Assessment;

public interface AssessmentRepository extends JpaRepository<Assessment, Integer> {

}