package com.harmoni.frontapi.main.user.service;

import com.harmoni.frontapi.main.common.FrontApiGenericResponse;
import com.harmoni.frontapi.main.common.ResponsePayload;
import com.harmoni.frontapi.main.user.dao.UserDao;
import com.harmoni.frontapi.main.user.model.User;
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

    public FrontApiGenericResponse<ResponsePayload.Empty> addUser(User user) {
        userDao.addUser(user);
        return new FrontApiGenericResponse<>(new ResponsePayload.Empty());
    }

    public FrontApiGenericResponse<User> getUserById(String id) {
        return new FrontApiGenericResponse<>(userDao.getUserById(id));
    }

    public FrontApiGenericResponse<ResponsePayload.Empty> deleteUserById(String id) {
        userDao.deleteUserById(id);
        return new FrontApiGenericResponse<>(new ResponsePayload.Empty());
    }

    public FrontApiGenericResponse<ResponsePayload.Empty> updateUserById(String id, User user) {
        userDao.updateUserById(id, user);
        return new FrontApiGenericResponse<>(new ResponsePayload.Empty());
    }

    public FrontApiGenericResponse<List<User>> getAllUsers() {
        return new FrontApiGenericResponse<>(userDao.getAllUsers());
    }
}
