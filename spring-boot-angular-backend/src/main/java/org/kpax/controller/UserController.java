package org.kpax.controller;

import org.kpax.entity.User;
import org.kpax.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users/list")
    public List<User> getUsers() {
        System.out.println("+++++ ==== Get users === +++++");
        return (List<User>) userRepository.findAll();
    }

    @PostMapping("/users/add")
    void addUser(@RequestBody User user) {
        userRepository.save(user);
    }
}