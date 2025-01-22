package com.harmoni.frontapi.main.product.dao;

import com.harmoni.frontapi.main.product.model.Product;

import java.util.List;
import java.util.UUID;

public interface ProductDao {
    int insertProduct(String id, Product product);

    default int insertProduct(Product product) {
        String id = UUID.randomUUID().toString();
        return insertProduct(id, product);
    }

    List<Product> getAllProducts();

    Product getProductById(String id);

    int deleteProductById(String id);

    int updateProductById(String id, Product product);
}
