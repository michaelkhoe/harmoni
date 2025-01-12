package com.harmoni.frontapi.main.customer.controller;

import com.harmoni.frontapi.main.customer.service.CustomerService;
import com.harmoni.frontapi.main.customer.service.model.Customer;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Customer APIs", description = "This a group of apis handling customer")
@RestController
@RequestMapping(path = "/api/v1/customer")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    @Operation(summary = "adds customer")
    public int addCustomer(@RequestBody Customer customer) {
        return customerService.addCustomer(customer);
    }

    @GetMapping("/{id}")
    @Operation(summary = "gets customer by id", description = "gets customer by id passed on the path variable")
    public Customer getCustomerById(@PathVariable String id) {
        return customerService.getCustomerById(id);
    }

    @GetMapping("/all")
    @Operation(summary = "gets all customers")
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @PutMapping("/{id}")
    @Operation(summary = "updates a customer by id", description = "updates a customer by id passed on the path variable")
    public int updateCustomerById(
            @PathVariable String id,
            @RequestBody Customer customer) {
        return customerService.updateCustomerById(id, customer);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "deletes a customer by id", description = "deletes a customer by id passed on the path variable")
    public int deleteCustomerById(@PathVariable String id) {
        return customerService.deleteCustomerById(id);
    }
}
