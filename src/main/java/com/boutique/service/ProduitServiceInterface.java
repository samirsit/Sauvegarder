package com.boutique.service;

import com.boutique.model.Produit;

import java.util.List;

public interface ProduitServiceInterface {
    // Ajouter un produit
    Produit ajouterProduit(Produit produit);

    // Afficher tous les produits du vendeur
    List<Produit> getProduitsParVendeur(String email);

    // Mettre à jour un produit
    Produit mettreAJourProduit(Long id, Produit produit);

    // Supprimer un produit
    void supprimerProduit(Long id);
}
