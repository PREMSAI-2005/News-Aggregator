package com.example.flashnews.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.flashnews.model.User;
import com.example.flashnews.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userRepository.save(user);
    }
}
