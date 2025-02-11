package com.harmoni.frontapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
	exclude = {
		org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,
	}
)
public class FrontapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(FrontapiApplication.class, args);
	}

}
