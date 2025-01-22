package com.harmoni.frontapi.main.transaction.model;

import com.harmoni.frontapi.main.customer.model.Customer;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Transaction {
    private String id;
    private LocalDateTime date;
    private Customer customer;
    private List<TransactionItem> items;
    private double totalAmount;
    private PaymentMethod paymentMethod;
}

