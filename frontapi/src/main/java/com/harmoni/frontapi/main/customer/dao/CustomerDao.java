package com.harmoni.frontapi.main.customer.dao;

import com.harmoni.frontapi.main.customer.model.Customer;

import java.util.List;
import java.util.UUID;

public interface CustomerDao {

    int addCustomer(String id, Customer customer);

    default int addCustomer(Customer customer) {
        String id = UUID.randomUUID().toString();
        return addCustomer(id, customer);
    }

    List<Customer> getAllCustomers();

    Customer getCustomerById(String id);

    int deleteCustomerById(String id);

    int updateCustomerById(String id, Customer customer);
}
