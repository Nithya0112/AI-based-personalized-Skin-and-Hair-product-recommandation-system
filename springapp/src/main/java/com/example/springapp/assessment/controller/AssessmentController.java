package com.example.springapp.assessment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.assessment.entity.Assessment;
import com.example.springapp.assessment.service.AssessmentService;

@RestController
@RequestMapping("/assessment")
public class AssessmentController {

    @Autowired
    AssessmentService service;

    @PostMapping("/analyze")
    public Assessment analyze(@RequestBody Assessment assessment) {

        return service.analyze(assessment);
    }
}