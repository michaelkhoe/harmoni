package com.harmoni.frontapi.main.customer.model;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Customer {
    private String id;
    private String name;
    private String email;
    private String phoneNumber;
    private String address;
}
