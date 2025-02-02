package com.harmoni.frontapi.main.user.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.harmoni.frontapi.main.user.model.Session;

public interface SessionRepository extends JpaRepository<Session, UUID> {

}
