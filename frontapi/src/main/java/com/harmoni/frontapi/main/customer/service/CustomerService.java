package com.harmoni.frontapi.main.customer.service;

import com.harmoni.frontapi.main.customer.service.dao.CustomerDao;
import com.harmoni.frontapi.main.customer.service.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerDao customerDao;

    @Autowired
    public CustomerService(CustomerDao customerDao) {
        this.customerDao = customerDao;
    }

    public int addCustomer(Customer customer) {
        return customerDao.addCustomer(customer);
    }

    public Customer getCustomerById(String id) {
        return customerDao.getCustomerById(id);
    }

    public int deleteCustomerById(String id) {
        return customerDao.deleteCustomerById(id);
    }

    public int updateCustomerById(String id, Customer customer) {
        return customerDao.updateCustomerById(id, customer);
    }

    public List<Customer> getAllCustomers() {
        return customerDao.getAllCustomers();
    }
}
