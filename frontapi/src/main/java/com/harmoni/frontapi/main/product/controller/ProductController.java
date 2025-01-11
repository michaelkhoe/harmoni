package com.harmoni.frontapi.main.product.controller;

import com.harmoni.frontapi.main.product.service.ProductService;
import com.harmoni.frontapi.main.product.service.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/product")
@RestController
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public void addProduct(@NonNull @RequestBody Product product) {
        productService.addProduct(product);
    }

    @GetMapping
    public List<Product> getAllProduct() {
        return productService.getAllProducts();
    }
}
