package com.harmoni.frontapi.main.user.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.harmoni.frontapi.main.user.model.Session;

import jakarta.transaction.Transactional;

public interface SessionRepository extends JpaRepository<Session, UUID> {
    @Transactional
    @Modifying
    @Query(value = "UPDATE sessions SET deleted_at = now() WHERE id = :id", nativeQuery = true)
    int softDelete(@Param("id") UUID id);
}
