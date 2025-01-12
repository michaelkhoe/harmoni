package com.harmoni.frontapi.main.transaction.service.model;

import com.harmoni.frontapi.main.product.service.model.Product;
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
