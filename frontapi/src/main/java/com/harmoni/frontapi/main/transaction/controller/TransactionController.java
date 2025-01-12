package com.harmoni.frontapi.main.transaction.controller;

import com.harmoni.frontapi.main.transaction.service.TransactionService;
import com.harmoni.frontapi.main.transaction.service.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/api/v1/executeTransaction")
    public int executeTransaction(@NonNull @RequestBody Transaction transaction) {
        return transactionService.executeTransaction(transaction);
    }

    @GetMapping("/api/v1/getTransactionById")
    public Transaction getTransactionById(@RequestParam String id) {
        return transactionService.getTransactionById(id);
    }

    @GetMapping("/api/v1/getAllTransactions")
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }
}
