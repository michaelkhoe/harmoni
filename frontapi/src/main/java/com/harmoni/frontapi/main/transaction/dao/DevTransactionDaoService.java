package com.harmoni.frontapi.main.transaction.dao;

import com.harmoni.frontapi.main.transaction.model.Transaction;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository("devTransactionDao")
public class DevTransactionDaoService implements TransactionDao {

    private final List<Transaction> DB = new ArrayList<>();

    @Override
    public int executeTransaction(String id, Transaction transaction) {
        DB.add(Transaction.builder()
                .id(id)
                .date(transaction.getDate())
                .customer(transaction.getCustomer())
                .items(transaction.getItems())
                .totalAmount(transaction.getTotalAmount())
                .paymentMethod(transaction.getPaymentMethod())
                .build()
        );
        return 1;
    }

    @Override
    public Transaction getTransactionById(String id) {
        return DB.stream().filter(
                transaction -> transaction.getId().equals(id)
        ).findFirst().orElse(null);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return DB;
    }
}
