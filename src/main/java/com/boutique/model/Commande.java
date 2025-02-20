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
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commandeId;

    private String status; // Correction de 'Status' à 'status'

    // Relation avec l'adresse de livraison
    @ManyToOne
    private Adresse adresseLivraison; // Utilisation de 'adresseLivraison' pour éviter confusion

    // Relations avec les autres entités
    @ManyToOne
    private Client client;

    @ManyToMany
    @JoinTable(
            name = "liste_produits", // Nom de la table de jointure
            joinColumns = @JoinColumn(name = "commandeId"), // Colonne faisant référence à la Commande
            inverseJoinColumns = @JoinColumn(name = "produitId") // Colonne faisant référence au Produit
    )
    private List<Produit> listeProduit;
}
