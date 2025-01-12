package com.harmoni.frontapi.main.customer.service.dao;

import com.harmoni.frontapi.main.customer.service.model.Customer;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository("devCustomerDao")
public class DevCustomerDaoService implements CustomerDao {

    private final List<Customer> DB = new ArrayList<>();

    @Override
    public int addCustomer(String id, Customer customer) {
        DB.add(Customer.builder()
                .id(id)
                .name(customer.getName())
                .email(customer.getEmail())
                .phoneNumber(customer.getPhoneNumber())
                .address(customer.getAddress())
                .build()
        );
        return 1;
    }

    @Override
    public List<Customer> getAllCustomers() {
        return DB;
    }

    @Override
    public Customer getCustomerById(String id) {
        return DB.stream().filter(
                customer -> customer.getId().equals(id)
        ).findFirst().orElse(null);
    }

    @Override
    public int deleteCustomerById(String id) {
        if (DB.stream().noneMatch(c -> c.getId().equals(id))) {
            return 0;
        }
        boolean removed = DB.removeIf(customer -> customer.getId().equals(id));
        return removed ? 1 : 0;
    }

    @Override
    public int updateCustomerById(String id, Customer customer) {
        if (DB.stream().noneMatch(c -> c.getId().equals(id))) {
            return 0;
        }
        DB.stream().filter(c -> c.getId().equals(id))
                .forEach(c -> {
                    c.setName(customer.getName());
                    c.setEmail(customer.getEmail());
                    c.setPhoneNumber(customer.getPhoneNumber());
                    c.setAddress(customer.getAddress());
                });
        return 1;
    }
}
