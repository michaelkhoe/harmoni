package com.harmoni.frontapi.main.product.controller;

import com.harmoni.frontapi.main.common.FrontApiGenericResponse;
import com.harmoni.frontapi.main.common.ResponsePayload;
import com.harmoni.frontapi.main.product.service.ProductService;
import com.harmoni.frontapi.main.product.model.Product;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Product APIs", description = "This a group of apis handling product")
@RestController
@RequestMapping("/api/v1/product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    @Operation(summary = "adds product")
    public FrontApiGenericResponse<ResponsePayload.Empty> addProduct(@NonNull @RequestBody Product product) {
        return productService.addProduct(product);
    }

    @GetMapping("/all")
    @Operation(summary = "gets all products")
    public FrontApiGenericResponse<List<Product>> getAllProduct() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    @Operation(summary = "gets product by id")
    public FrontApiGenericResponse<Product> getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "updates a product by id")
    public FrontApiGenericResponse<ResponsePayload.Empty> updateProductById(
            @PathVariable String id,
            @NonNull @RequestBody Product product
    ) {
        return productService.updateProductById(id, product);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "deletes a product by id")
    public FrontApiGenericResponse<ResponsePayload.Empty> deleteProductById(@PathVariable String id) {
        return productService.deleteProductById(id);
    }
}