package com.harmoni.frontapi.main.user.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harmoni.frontapi.main.common.FrontApiGenericResponse;
import com.harmoni.frontapi.main.user.dao.LoginRequest;
import com.harmoni.frontapi.main.user.dao.LoginResponse;
import com.harmoni.frontapi.main.user.dao.RegisterRequest;
import com.harmoni.frontapi.main.user.dao.RegisterResponse;
import com.harmoni.frontapi.main.user.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication APIs", description = "This a group of apis handling authentications")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping
    @Operation(summary = "handles basic authentication")
    public FrontApiGenericResponse<LoginResponse> login(@RequestBody LoginRequest body) {
        LoginResponse response = this.authService.login(body);
        return new FrontApiGenericResponse<>(response);
    }

    @PostMapping("/register")
    @Operation(summary = "handles basic registration", description = "this is temporary, will be moved as part of user-controller")
    public FrontApiGenericResponse<RegisterResponse> register(@RequestBody RegisterRequest body) {
        RegisterResponse response = this.authService.register(body);
        return new FrontApiGenericResponse<>(response);
    }

    @PostMapping("/logout")
    @Operation(summary = "handles logout")
    public Object logout(@RequestHeader String sessionToken, @RequestHeader String refreshToken) {
        this.authService.logout(sessionToken, refreshToken);
        return new FrontApiGenericResponse<>(null);
    }
}
