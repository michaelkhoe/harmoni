package com.harmoni.frontapi.main.user.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @PostMapping
    @Operation(summary = "handles login")
    public Object login() {
        return null;
    }

    @PostMapping("/logout")
    @Operation(summary = "handles logout")
    public Object logout() {
        return null;
    }
}
