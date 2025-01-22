package com.harmoni.frontapi.main.transaction.service;

import com.harmoni.frontapi.main.common.FrontApiGenericResponse;
import com.harmoni.frontapi.main.common.ResponsePayload;
import com.harmoni.frontapi.main.transaction.dao.TransactionDao;
import com.harmoni.frontapi.main.transaction.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionDao transactionDao;

    @Autowired
    public TransactionService(TransactionDao transactionDao) {
        this.transactionDao = transactionDao;
    }

    public FrontApiGenericResponse<ResponsePayload.Empty> executeTransaction(Transaction transaction) {
        transactionDao.executeTransaction(transaction);
        return new FrontApiGenericResponse<>(new ResponsePayload.Empty());
    }

    public FrontApiGenericResponse<Transaction> getTransactionById(String id) {
        return new FrontApiGenericResponse<>(transactionDao.getTransactionById(id));
    }

    public FrontApiGenericResponse<List<Transaction>> getAllTransactions() {
        return new FrontApiGenericResponse<>(transactionDao.getAllTransactions());
    }
}
