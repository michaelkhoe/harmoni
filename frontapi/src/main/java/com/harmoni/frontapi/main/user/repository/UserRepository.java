package com.harmoni.frontapi.main.user.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.harmoni.frontapi.main.user.model.UserV2;

import jakarta.transaction.Transactional;

public interface UserRepository extends JpaRepository<UserV2, UUID> {
    UserV2 findByEmail(String email);

    // had to do this because UserRole enum
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO users (id, name, email, password, role) VALUES (gen_random_uuid(), :name, :email, :password, CAST(:role AS user_role))", nativeQuery = true)
    int createUser(@Param("name") String name, @Param("email") String email, @Param("password") String password, @Param("role") String role);
}
