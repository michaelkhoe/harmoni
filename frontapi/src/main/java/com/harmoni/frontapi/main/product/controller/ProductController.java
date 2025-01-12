package com.harmoni.frontapi.main.product.controller;

import com.harmoni.frontapi.main.product.service.ProductService;
import com.harmoni.frontapi.main.product.service.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/api/v1/addProduct")
    public int addProduct(@NonNull @RequestBody Product product) {
        return productService.addProduct(product);
    }

    @GetMapping("/api/v1/getAllProducts")
    public List<Product> getAllProduct() {
        return productService.getAllProducts();
    }

    @GetMapping("/api/v1/getProductById")
    public Product getProductById(@RequestParam String id) {
        return productService.getProductById(id);
    }

    @PutMapping("/api/v1/updateProductById")
    public int updateProductById(
            @RequestParam String id,
            @NonNull @RequestBody Product product
    ) {
        return productService.updateProductById(id, product);
    }

    @DeleteMapping("/api/v1/deleteProductById")
    public int deleteProductById(@RequestParam String id) {
        return productService.deleteProductById(id);
    }
}