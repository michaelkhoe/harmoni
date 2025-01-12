package com.harmoni.frontapi.main.transaction.service;

import com.harmoni.frontapi.main.transaction.service.dao.TransactionDao;
import com.harmoni.frontapi.main.transaction.service.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private TransactionDao transactionDao;

    @Autowired
    public TransactionService(TransactionDao transactionDao) {
        this.transactionDao = transactionDao;
    }

    public int executeTransaction(Transaction transaction) {
        return transactionDao.executeTransaction(transaction);
    }

    public Transaction getTransactionById(String id) {
        return transactionDao.getTransactionById(id);
    }

    public List<Transaction> getAllTransactions() {
        return transactionDao.getAllTransactions();
    }
}
