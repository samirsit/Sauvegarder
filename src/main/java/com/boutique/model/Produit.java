package com.boutique.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long produitId;

    private String nomProduit;
    private String description;
    private float prix;
    private String fabricant;
    private int quantiteDisponible;
    private String status;
    private String categorie;

    // Relations avec les autres entités
    @ManyToOne
    private Vendeur vendeur;

    @ManyToMany(mappedBy = "listeProduit") // mappedBy indique la relation inverse dans Commande
    private List<Commande> commandes;
}
