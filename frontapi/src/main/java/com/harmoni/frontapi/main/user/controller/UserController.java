package com.harmoni.frontapi.main.user.controller;

import com.harmoni.frontapi.main.user.service.UserService;
import com.harmoni.frontapi.main.user.service.model.User;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/v1/addUser")
    public int addUser(@NonNull @RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping("/api/v1/getUserById")
    public User getUserById(@RequestParam String id) {
        return userService.getUserById(id);
    }

    @GetMapping("/api/v1/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/api/v1/deleteUserById")
    public int deleteUserById(@RequestParam String id) {
        return userService.deleteUserById(id);
    }

    @PutMapping("/api/v1/updateUserById")
    public int updateUserById(
            @RequestParam String id,
            @RequestBody User user
    ) {
        return userService.updateUserById(id, user);
    }
}
