package com.boutique.controller;

import com.boutique.model.Produit;
import com.boutique.service.VendeurServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendeur")
@RequiredArgsConstructor
public class VendeurController {

    private final VendeurServiceImpl vendeurService;

    // 🔹 Ajouter un produit
    @PostMapping("/ajouter-produits")
    public ResponseEntity<Produit> ajouterProduit(@RequestBody Produit produit) {
        return ResponseEntity.ok(vendeurService.ajouterProduit(produit));
    }

    // 🔹 Lister les produits d'un vendeur (par email)
    @GetMapping("/listes-produits/{email}")
    public ResponseEntity<List<Produit>> getProduitsParVendeur(@PathVariable String email) {
        return ResponseEntity.ok(vendeurService.getProduitsParVendeur(email));
    }

    // 🔹 Mettre à jour un produit (par ID)
    @PutMapping("/modifier-produits/{id}")
    public ResponseEntity<Produit> mettreAJourProduit(@PathVariable Long id, @RequestBody Produit produit) {
        return ResponseEntity.ok(vendeurService.mettreAJourProduit(id, produit));
    }

    // 🔹 Supprimer un produit (par ID)
    @DeleteMapping("/supprimer-produits/{id}")
    public ResponseEntity<Void> supprimerProduit(@PathVariable Long id) {
        vendeurService.supprimerProduit(id);
        return ResponseEntity.noContent().build();
    }
}
