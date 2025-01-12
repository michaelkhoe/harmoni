package com.harmoni.frontapi.main.transaction.service.dao;

import com.harmoni.frontapi.main.transaction.service.model.Transaction;

import java.util.List;
import java.util.UUID;

public interface TransactionDao {

    int executeTransaction(String id, Transaction transaction);

    default int executeTransaction(Transaction transaction) {
        String id = UUID.randomUUID().toString();
        return executeTransaction(id, transaction);
    }

    Transaction getTransactionById(String id);

    List<Transaction> getAllTransactions();

    // TODO: Add more methods like
    //  deleteTransactionById will be used to delete a transaction by admin
    //  updateTransactionById will be used to update a transaction by admin
}

