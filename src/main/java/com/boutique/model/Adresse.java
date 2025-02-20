package com.boutique.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Adresse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adresseId; // Identifiant de l'adresse

    private String rue;
    private String numeroRue;
    private String ville;
    private String codePostal; // Correction de 'codePostale' à 'codePostal'

    // Relation avec les commandes
    @OneToMany(mappedBy = "adresseLivraison", fetch = FetchType.LAZY)
    private List<Commande> commandes;
}
