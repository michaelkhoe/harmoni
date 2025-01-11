package com.harmoni.frontapi.main.product.service.dao;

import com.harmoni.frontapi.main.product.service.model.Product;

import java.util.List;
import java.util.UUID;

public interface ProductDao {
    int insertProduct(String id, Product product);

    default int insertProduct(Product product) {
        String id = UUID.randomUUID().toString();
        return insertProduct(id, product);
    }

    List<Product> selectAllProducts();

    Product selectProductById(String id);

    int deleteProductById(String id);

    int updateProductById(String id, Product product);
}
