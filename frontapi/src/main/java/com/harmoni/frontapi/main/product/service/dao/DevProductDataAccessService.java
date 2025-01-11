package com.harmoni.frontapi.main.product.service.dao;

import com.harmoni.frontapi.main.product.service.model.Product;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository("devProductDao")
public class DevProductDataAccessService implements ProductDao {

    private static List<Product> DB = new ArrayList<>();

    @Override
    public int insertProduct(String id, Product product) {
        DB.add(Product.builder()
                .id(id)
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .image(product.getImage())
                .build()
        );
        return 1;
    }

    @Override
    public List<Product> selectAllProducts() {
        return DB;
    }

    @Override
    public Product selectProductById(String id) {
        return null;
    }

    @Override
    public int deleteProductById(String id) {
        return 0;
    }

    @Override
    public int updateProductById(String id, Product product) {
        return 0;
    }
}
