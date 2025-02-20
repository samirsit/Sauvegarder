package com.boutique.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "admin")
@Data @NoArgsConstructor @AllArgsConstructor
public class Admin extends User {


    private String email;
    private String telephone;
    private String nom;

    @Column(name = "prenom", nullable = false)
    private String prenom;
}
