package com.harmoni.frontapi.main.customer.controller;

import com.harmoni.frontapi.main.customer.service.CustomerService;
import com.harmoni.frontapi.main.customer.service.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/api/v1/addCustomer")
    public int addCustomer(@RequestBody Customer customer) {
        return customerService.addCustomer(customer);
    }

    @GetMapping("/api/v1/getCustomerById")
    public Customer getCustomerById(@RequestParam String id) {
        return customerService.getCustomerById(id);
    }

    @GetMapping("/api/v1/getAllCustomers")
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @PutMapping("/api/v1/updateCustomerById")
    public int updateCustomerById(
            @RequestParam String id,
            @RequestBody Customer customer
    ) {
        return customerService.updateCustomerById(id, customer);
    }

    @DeleteMapping("/api/v1/deleteCustomerById")
    public int deleteCustomerById(@RequestParam String id) {
        return customerService.deleteCustomerById(id);
    }
}
