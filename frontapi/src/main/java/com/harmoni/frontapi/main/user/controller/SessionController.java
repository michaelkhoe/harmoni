package com.harmoni.frontapi.main.user.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1/session")
public class SessionController {
    @GetMapping()
    @Operation(summary = "retrieve session data")
    public Object getSession() {
        return null;
    }
}
