package com.harmoni.frontapi.main.transaction.model;

import com.harmoni.frontapi.main.product.model.Product;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class TransactionItem {
    private Product product;
    private int quantity;
    private double unitPrice;
    private double salePrice;
    private double totalPrice;
}
