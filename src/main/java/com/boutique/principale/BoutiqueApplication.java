package com.boutique.principale;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.boutique")
@EnableJpaRepositories(basePackages = {"com.boutique.repository", "com.boutique.security.repository"})  // Correction ici
@ComponentScan("com.boutique")
@EntityScan(basePackages = {"com.boutique"})
public class BoutiqueApplication {

	public static void main(String[] args) {
		SpringApplication.run(BoutiqueApplication.class, args);
	}
}
