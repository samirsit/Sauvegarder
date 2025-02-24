package com.boutique.service;

import com.boutique.model.Client;
import com.boutique.model.Produit;
import com.boutique.model.Vendeur;

import java.util.List;

public interface VendeurServiceInterface {

        Vendeur enregistrerVendeur(Vendeur vendeur);
        Vendeur mettreAJourVendeur(String email, Vendeur vendeur);
        void supprimerVendeur(String email);

       /* // Ajouter un produit
        Produit ajouterProduit(Produit produit);

        // Afficher tous les produits du vendeur
        List<Produit> getProduitsParVendeur(String email);

        // Mettre à jour un produit
        Produit mettreAJourProduit(Long id, Produit produit);

        // Supprimer un produit
        void supprimerProduit(Long id);*/
    }

