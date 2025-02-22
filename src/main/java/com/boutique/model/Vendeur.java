package com.boutique.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "vendeur")
@Data
@NoArgsConstructor @AllArgsConstructor
public class Vendeur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private String email;
    private String nomSociete;
    private String telephone;

    @OneToMany(mappedBy = "vendeur", fetch = FetchType.LAZY)
    private List<Produit> produits;

}
