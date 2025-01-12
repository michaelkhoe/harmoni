package com.harmoni.frontapi.main.product.service.model;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Product {
    private String id;
    private String name;
    private String description;
    private String price;
    private String stock;
    private String image;
}