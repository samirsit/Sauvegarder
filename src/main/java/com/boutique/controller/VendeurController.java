package com.boutique.controller;

import com.boutique.model.Client;
import com.boutique.model.Produit;
import com.boutique.model.Vendeur;
import com.boutique.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendeur")
@RequiredArgsConstructor
public class VendeurController {

    private final VendeurServiceInterface vendeurServiceInterface;

    // Ajouter un vendeur
    @PostMapping(path = "/creer-vendeur")
    public ResponseEntity<Vendeur> enregistrerClient(@RequestBody Vendeur vendeur) {
        Vendeur nouveauVendeur = vendeurServiceInterface.enregistrerVendeur(vendeur);
        return ResponseEntity.ok(nouveauVendeur);
    }

    // Mettre à jour un vendeur
    @PutMapping("/modifier-vendeur/{email}")
    public ResponseEntity<Vendeur> mettreAJourVendeur(@PathVariable String email, @RequestBody Vendeur vendeur) {
        Vendeur VendeurMisAJour = vendeurServiceInterface.mettreAJourVendeur(email, vendeur);
        return ResponseEntity.ok(VendeurMisAJour);
    }

    // Supprimer un vendeur
    @DeleteMapping("/supprimer-vendeur/{email}")
    public ResponseEntity<Void> supprimerVendeur(@PathVariable String email) {
        vendeurServiceInterface.supprimerVendeur(email);
        return ResponseEntity.noContent().build();
    }
}
