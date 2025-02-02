package com.harmoni.frontapi.main.user.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

/**
 * NOTE:
 * deliberately making this which will eventually become
 * the "User" class, using this for now to avoid breaking
 * on many places
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "users", schema = "public")
public class UserV2 {
    @Id
    @GeneratedValue
    private UUID id;

    private String name;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    @Convert(converter = UserRoleConverter.class)
    @Column(columnDefinition = "user_role")
    private UserRole role;
}
