package com.harmoni.frontapi.main.transaction.controller;

import com.harmoni.frontapi.main.common.FrontApiGenericResponse;
import com.harmoni.frontapi.main.common.ResponsePayload;
import com.harmoni.frontapi.main.transaction.service.TransactionService;
import com.harmoni.frontapi.main.transaction.model.Transaction;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Transaction APIs", description = "This a group of apis handling transaction")
@RestController
@RequestMapping("/api/v1/transaction")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/execute")
    @Operation(summary = "Execute a transaction", description = "This api is used to execute a transaction")
    public FrontApiGenericResponse<ResponsePayload.Empty> executeTransaction(@NonNull @RequestBody Transaction transaction) {
        return transactionService.executeTransaction(transaction);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a transaction by id", description = "This api is used to get a transaction by id")
    public FrontApiGenericResponse<Transaction> getTransactionById(@PathVariable String id) {
        return transactionService.getTransactionById(id);
    }

    @GetMapping("/all")
    @Operation(summary = "Get all transactions", description = "This api is used to get all transactions")
    public FrontApiGenericResponse<List<Transaction>> getAllTransactions() {
        return transactionService.getAllTransactions();
    }
}
