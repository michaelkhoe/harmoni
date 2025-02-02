package com.harmoni.frontapi.main.user.dao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class LoginResponse {
    private Boolean status;
    private String message;
    private String sessionToken;
    private String refreshToken;
}
