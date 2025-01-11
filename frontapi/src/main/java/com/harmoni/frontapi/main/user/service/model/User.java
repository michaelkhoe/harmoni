package com.harmoni.frontapi.main.user.service.model;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class User {
    private String id;
    private String name;
    private String email;
    private String password;
    private Role role;
}
