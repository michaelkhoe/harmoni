package com.harmoni.frontapi.main.user.dao;


import com.harmoni.frontapi.main.user.model.User;
import jakarta.annotation.Nullable;

import java.util.List;
import java.util.UUID;

public interface UserDao {

    int addUser(String id, User user);

    default int addUser(User user) {
        String id = UUID.randomUUID().toString();
        return addUser(id, user);
    }

    @Nullable
    User getUserById(String id);

    List<User> getAllUsers();

    int deleteUserById(String id);

    int updateUserById(String id, User user);
}
