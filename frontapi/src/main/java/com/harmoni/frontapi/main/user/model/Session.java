package com.harmoni.frontapi.main.user.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "sessions", schema = "public")
public class Session {
    @Id
    @GeneratedValue
    private UUID id;

    private UUID userId;
    private LocalDateTime createdAt;
    private LocalDateTime expiredAt;

}
