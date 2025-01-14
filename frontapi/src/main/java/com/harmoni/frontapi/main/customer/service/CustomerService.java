package com.harmoni.frontapi.main.customer.service;

import com.harmoni.frontapi.main.common.FrontApiGenericResponse;
import com.harmoni.frontapi.main.common.ResponsePayload;
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

    public FrontApiGenericResponse<ResponsePayload.Empty> addCustomer(Customer customer) {
        customerDao.addCustomer(customer);
        return new FrontApiGenericResponse<>(new ResponsePayload.Empty());
    }

    public FrontApiGenericResponse<Customer> getCustomerById(String id) {
        return new FrontApiGenericResponse<>(customerDao.getCustomerById(id));
    }

    public FrontApiGenericResponse<ResponsePayload.Empty> deleteCustomerById(String id) {
        customerDao.deleteCustomerById(id);
        return new FrontApiGenericResponse<>(new ResponsePayload.Empty());
    }

    public FrontApiGenericResponse<ResponsePayload.Empty> updateCustomerById(String id, Customer customer) {
        customerDao.updateCustomerById(id, customer);
        return new FrontApiGenericResponse<>(new ResponsePayload.Empty());
    }

    public FrontApiGenericResponse<List<Customer>> getAllCustomers() {
        return new FrontApiGenericResponse<>(customerDao.getAllCustomers());
    }
}
