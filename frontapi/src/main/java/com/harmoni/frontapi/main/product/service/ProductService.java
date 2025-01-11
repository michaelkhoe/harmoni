package com.harmoni.frontapi.main.product.service;

import com.harmoni.frontapi.main.product.service.dao.ProductDao;
import com.harmoni.frontapi.main.product.service.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductDao productDao;

    @Autowired
    public ProductService(ProductDao productDao) {
        this.productDao = productDao;
    }

    public int addProduct(Product product) {
        return productDao.insertProduct(product);
    }

    public List<Product> getAllProducts() {
        return productDao.selectAllProducts();
    }
}
