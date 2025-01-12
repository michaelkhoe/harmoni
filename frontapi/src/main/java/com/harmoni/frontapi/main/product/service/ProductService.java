package com.harmoni.frontapi.main.product.service;

import com.harmoni.frontapi.main.common.FrontApiGenericResponse;
import com.harmoni.frontapi.main.common.ResponsePayload;
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

    public FrontApiGenericResponse<ResponsePayload.Empty> addProduct(Product product) {
        productDao.insertProduct(product);
        return new FrontApiGenericResponse<>(new ResponsePayload.Empty());
    }

    public FrontApiGenericResponse<List<Product>> getAllProducts() {
        return new FrontApiGenericResponse<>(productDao.getAllProducts());
    }

    public FrontApiGenericResponse<Product> getProductById(String id) {
        return new FrontApiGenericResponse<>(productDao.getProductById(id));
    }

    public FrontApiGenericResponse<ResponsePayload.Empty> updateProductById(String id, Product product) {
        productDao.updateProductById(id, product);
        return new FrontApiGenericResponse<>(new ResponsePayload.Empty());
    }

    public FrontApiGenericResponse<ResponsePayload.Empty> deleteProductById(String id) {
        productDao.deleteProductById(id);
        return new FrontApiGenericResponse<>(new ResponsePayload.Empty());
    }
}
