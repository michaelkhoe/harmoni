package com.harmoni.frontapi.main.user.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Builder
@Getter
@Setter
@Table(name = "refresh_tokens", schema = "public")
public class RefreshToken {

    @Id
    @GeneratedValue
    private UUID id;

    private UUID sessionId;
    private LocalDateTime createdAt;
    private LocalDateTime expiredAt;

    public RefreshToken() {

    }

    public RefreshToken(UUID id, UUID sessionId, LocalDateTime createdAt, LocalDateTime expiredAt) {
        this.id = id;
        this.sessionId = sessionId;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
    }
}
