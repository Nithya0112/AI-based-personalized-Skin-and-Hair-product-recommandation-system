package com.example.springapp.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.user.entity.User;

public interface UserRepository extends JpaRepository<User, String> {

}