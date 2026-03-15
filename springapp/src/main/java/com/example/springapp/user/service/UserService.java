package com.example.springapp.user.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.user.entity.User;
import com.example.springapp.user.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository repo;

    public String register(User user) {

        if (repo.existsById(user.getEmail())) {
            return "User already exists";
        }

        repo.save(user);
        return "Registration successful";
    }

    public String login(String email, String password) {

        Optional<User> user = repo.findById(email);

        if (user.isPresent()) {

            if (user.get().getPassword().equals(password)) {
                return "Login successful";
            } else {
                return "Invalid password";
            }

        }

        return "User not found";
    }

}