package com.example.springapp.skinanalysis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.skinanalysis.entity.SkinImage;

public interface SkinImageRepository extends JpaRepository<SkinImage, Integer> {

}
