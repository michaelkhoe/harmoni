package com.harmoni.frontapi.main.user.service;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.harmoni.frontapi.main.user.dao.LoginRequest;
import com.harmoni.frontapi.main.user.dao.LoginResponse;
import com.harmoni.frontapi.main.user.dao.RegisterRequest;
import com.harmoni.frontapi.main.user.dao.RegisterResponse;
import com.harmoni.frontapi.main.user.model.RefreshToken;
import com.harmoni.frontapi.main.user.model.UserRole;
import com.harmoni.frontapi.main.user.model.Session;
import com.harmoni.frontapi.main.user.model.UserV2;
import com.harmoni.frontapi.main.user.repository.RefreshTokenRepository;
import com.harmoni.frontapi.main.user.repository.SessionRepository;
import com.harmoni.frontapi.main.user.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository, SessionRepository sessionRepository,
            RefreshTokenRepository refreshTokenRepository) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    /**
     * leaving this here for future reference to generate password
     * 
     * @param raw
     * @return
     */
    private String generatePassword(String raw) {
        return passwordEncoder.encode(raw);
    }

    /**
     * Process simple login request using email and password
     * 
     * @param request
     * @return
     */
    public LoginResponse login(LoginRequest request) {
        // validate request
        if (request.getEmail().length() == 0) {
            return LoginResponse.builder()
                    .status(true)
                    .message("email cannot be empty")
                    .build();
        }
        if (request.getPassword().length() == 0) {
            return LoginResponse.builder()
                    .status(false)
                    .message("password cannot be empty")
                    .build();
        }

        // retrieve user by email
        UserV2 user = this.userRepository.findByEmail(request.getEmail());
        if (Objects.isNull(user)) {
            return null;
        }

        // validate password
        // NOTE: probably better to have abstraction for password handling
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return LoginResponse.builder().status(false).message("invalid email/password").build();
        }

        // construct expiry
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiry = now.plusHours(1);

        // construct session data
        Session newSession = Session.builder()
                .userId(user.getId())
                .createdAt(now)
                .expiredAt(expiry)
                .build();
        newSession = this.sessionRepository.save(newSession);

        // construct refresh token
        expiry.plusHours(1);
        RefreshToken refreshToken = RefreshToken.builder()
                .sessionId(newSession.getId())
                .createdAt(now)
                .expiredAt(expiry)
                .build();
        refreshToken = this.refreshTokenRepository.save(refreshToken);

        // return
        return LoginResponse.builder()
                .sessionToken(refreshToken.getSessionId().toString())
                .refreshToken(refreshToken.getId().toString())
                .build();
    }

    public RegisterResponse register(RegisterRequest request) {
        // validate requests
        if (request.getName().length() == 0) {
            RegisterResponse.builder()
                    .status(false)
                    .message("name cannot be empty")
                    .build();
        }
        if (request.getEmail().length() == 0) {
            RegisterResponse.builder()
                    .status(true)
                    .message("email cannot be empty")
                    .build();
        }
        if (request.getPassword().length() == 0) {
            RegisterResponse.builder()
                    .status(false)
                    .message("password cannot be empty")
                    .build();
        }

        // validate new user existence
        UserV2 existingUser = this.userRepository.findByEmail(request.getEmail());
        if (Objects.nonNull(existingUser)) {
            return RegisterResponse.builder()
                    .status(false)
                    .message("email already registered")
                    .build();
        }

        // construct new user data
        String encryptedPassword = this.generatePassword(request.getPassword());

        // attempt to register
        try {
            this.userRepository.createUser(
                    request.getName(),
                    request.getEmail(),
                    encryptedPassword,
                    UserRole.USER.name());
        } catch (Exception e) {
            System.err.println("error on creating user. err=" + e.getMessage());
            return RegisterResponse.builder()
                    .status(false)
                    .message("error on creating user")
                    .build();
        }

        // return
        return RegisterResponse.builder()
                .status(true)
                .message("ok")
                .build();
    }

    /**
     * Handle logout request
     * 
     * @param session
     * @param refresh
     */
    public void logout(String sessionTokenStr, String refreshTokenStr) {
        try {
            UUID sessionToken = UUID.fromString(sessionTokenStr);
            UUID refreshToken = UUID.fromString(refreshTokenStr);

            this.sessionRepository.deleteById(sessionToken);
            this.refreshTokenRepository.deleteById(refreshToken);
        } catch (Exception e) {
            System.err.println("error on attempting to delete session and refresh-token");
            System.err.println(e);
        }
    }

}
