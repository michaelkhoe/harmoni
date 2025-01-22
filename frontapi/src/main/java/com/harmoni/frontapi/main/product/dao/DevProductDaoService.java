package com.harmoni.frontapi.main.product.dao;

import com.harmoni.frontapi.main.product.model.Product;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository("devProductDao")
public class DevProductDaoService implements ProductDao {

    private static final List<Product> DB = new ArrayList<>();

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
    public List<Product> getAllProducts() {
        return DB;
    }

    @Override
    public Product getProductById(String id) {
        return DB.stream().filter(
                product -> product.getId().equals(id)
        ).findFirst().orElse(null);
    }

    @Override
    public int deleteProductById(String id) {
        if (DB.stream().noneMatch(p -> p.getId().equals(id))) {
            return 0;
        }
        boolean removed = DB.removeIf(product -> product.getId().equals(id));
        return removed ? 1 : 0;
    }

    @Override
    public int updateProductById(String id, Product product) {
        if (DB.stream().noneMatch(p -> p.getId().equals(id))) {
            return 0;
        }
        DB.stream().filter(p -> p.getId().equals(id))
                .forEach(p -> {
                    p.setName(product.getName());
                    p.setDescription(product.getDescription());
                    p.setPrice(product.getPrice());
                    p.setStock(product.getStock());
                    p.setImage(product.getImage());
                });
        return 0;
    }
}
