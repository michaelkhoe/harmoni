package com.harmoni.frontapi.main.user.service;

import com.harmoni.frontapi.main.user.service.dao.UserDao;
import com.harmoni.frontapi.main.user.service.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserDao userDao;

    @Autowired
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public int addUser(User user) {
        return userDao.addUser(user);
    }

    public User getUserById(String id) {
        return userDao.getUserById(id);
    }

    public int deleteUserById(String id) {
        return userDao.deleteUserById(id);
    }

    public int updateUserById(String id, User user) {
        return userDao.updateUserById(id, user);
    }

    public List<User> getAllUsers() {
        return userDao.getAllUsers();
    }
}
