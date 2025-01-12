package com.harmoni.frontapi.main.user.controller;

import com.harmoni.frontapi.main.common.FrontApiGenericResponse;
import com.harmoni.frontapi.main.common.ResponsePayload;
import com.harmoni.frontapi.main.user.service.UserService;
import com.harmoni.frontapi.main.user.service.model.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "User APIs", description = "This a group of apis handling user")
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @Operation(summary = "adds user")
    public FrontApiGenericResponse<ResponsePayload.Empty> addUser(@NonNull @RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping("/{id}")
    @Operation(summary = "gets user by id")
    public FrontApiGenericResponse<User> getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @GetMapping("/all")
    @Operation(summary = "gets all users")
    public FrontApiGenericResponse<List<User>> getAllUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "deletes a user by id")
    public FrontApiGenericResponse<ResponsePayload.Empty> deleteUserById(@PathVariable String id) {
        return userService.deleteUserById(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "updates a user by id")
    public FrontApiGenericResponse<ResponsePayload.Empty> updateUserById(
            @PathVariable String id,
            @RequestBody User user
    ) {
        return userService.updateUserById(id, user);
    }
}
