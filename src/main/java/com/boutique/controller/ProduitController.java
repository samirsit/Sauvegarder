package com.boutique.controller;

import com.boutique.model.Produit;
import com.boutique.service.ProduitServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendeur/produits")
@RequiredArgsConstructor
public class ProduitController {

    private final ProduitServiceInterface produitServiceInterface;

    // 🔹 Ajouter un produit
    @PreAuthorize("hasAuthority('ROLE_VENDEUR')")
    @PostMapping("/ajouter")
    public ResponseEntity<Produit> ajouterProduit(@RequestBody Produit produit) {
        Produit nouveauProduit = produitServiceInterface.ajouterProduit(produit);
        System.out.println("ok");
        return ResponseEntity.ok(nouveauProduit);
    }

    // 🔹 Lister les produits d'un vendeur (par email)
    @PreAuthorize("hasAuthority('ROLE_VENDEUR')")
    @GetMapping("/{email}")
    public ResponseEntity<List<Produit>> getProduitsParVendeur(@PathVariable String email) {
        List<Produit> produits = produitServiceInterface.getProduitsParVendeur(email);
        return ResponseEntity.ok(produits);
    }

    // 🔹 Mettre à jour un produit (par ID)
    @PreAuthorize("hasAuthority('ROLE_VENDEUR')")
    @PutMapping("/{id}")
    public ResponseEntity<Produit> mettreAJourProduit(@PathVariable Long id, @RequestBody Produit produit) {
        Produit produitMisAJour = produitServiceInterface.mettreAJourProduit(id, produit);
        return ResponseEntity.ok(produitMisAJour);
    }

    // 🔹 Supprimer un produit (par ID)
    @PreAuthorize("hasAuthority('ROLE_VENDEUR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerProduit(@PathVariable Long id) {
        produitServiceInterface.supprimerProduit(id);
        return ResponseEntity.noContent().build();
    }
}
