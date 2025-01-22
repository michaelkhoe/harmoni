package com.harmoni.frontapi.main.user.dao;

import com.harmoni.frontapi.main.user.model.User;
import jakarta.annotation.Nullable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository("devUserDao")
public class DevUserDaoService implements UserDao {

    private static final List<User> DB = new ArrayList<>();

    @Override
    public int addUser(String id, User user) {
        DB.add(User.builder()
                .id(id)
                .name(user.getName())
                .email(user.getEmail())
                .password(user.getPassword())
                .role(user.getRole())
                .build()
        );
        return 1;
    }

    @Override
    public @Nullable User getUserById(String id) {
        return DB.stream()
                .filter(user -> user.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @Override
    public List<User> getAllUsers() {
        return DB;
    }

    @Override
    public int deleteUserById(String id) {
        if (DB.stream().noneMatch(u -> u.getId().equals(id))) {
            return 0;
        }
        boolean removed = DB.removeIf(user -> user.getId().equals(id));
        return removed ? 1 : 0;
    }

    @Override
    public int updateUserById(String id, User user) {
        if (DB.stream().noneMatch(u -> u.getId().equals(id))) {
            return 0;
        }
        DB.stream().filter(u -> u.getId().equals(id))
                .forEach(u -> {
                    u.setName(user.getName());
                    u.setEmail(user.getEmail());
                    u.setPassword(user.getPassword());
                    u.setRole(user.getRole());
                });
        return 1;
    }
}
