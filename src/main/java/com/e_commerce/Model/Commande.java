package com.e_commerce.Model;

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

    private String status; // correction de 'Status' à 'status' selon la convention de nommage Java

    // Relation avec l'adresse de livraison
    @ManyToOne
    private Adresse adresseLivraison; // utilisation de 'adresseLivraison' pour éviter confusion

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
