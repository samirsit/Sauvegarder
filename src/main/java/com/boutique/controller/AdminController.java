package com.boutique.controller;

import com.boutique.model.Client;
import com.boutique.model.Vendeur;
import com.boutique.service.AdminServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminServiceImpl adminService;

    // 🔹 CLIENTS

    // Ajouter un client
    @PostMapping("/admin")
    public ResponseEntity<Client> enregistrerClient(@RequestBody Client client) {
        return ResponseEntity.ok(adminService.enregistrerClient(client));
    }

    // Lister tous les clients
    @GetMapping("/admin/clients")
    public ResponseEntity<List<Client>> listerClients() {
        return ResponseEntity.ok(adminService.listerClients());
    }

    // Obtenir un client par ID
    @GetMapping("/admin/clients/id/{id}")
    public ResponseEntity<Client> obtenirClientParId(@PathVariable Long id) {
        return adminService.obtenirClientParId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Obtenir un client par email
    @GetMapping("/admin/clients/email/{email}")
    public ResponseEntity<Client> obtenirClientParEmail(@PathVariable String email) {
        return adminService.obtenirClientParEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Supprimer un client par ID
    @DeleteMapping("/admin/clients/id/{id}")
    public ResponseEntity<Void> supprimerClientParId(@PathVariable Long id) {
        adminService.supprimerClientParId(id);
        return ResponseEntity.noContent().build();
    }

    // Supprimer un client par email
    @DeleteMapping("/admin/clients/email/{email}")
    public ResponseEntity<Void> supprimerClientParEmail(@PathVariable String email) {
        adminService.supprimerClientParEmail(email);
        return ResponseEntity.noContent().build();
    }

    // 🔹 VENDEURS

    // Ajouter un vendeur
    @PostMapping("/admin/creer-vendeurs")
    public ResponseEntity<Vendeur> enregistrerVendeur(@RequestBody Vendeur vendeur) {
        return ResponseEntity.ok(adminService.enregistrerVendeur(vendeur));
    }

    // Lister tous les vendeurs
    @GetMapping("/admin/listes-vendeurs")
    public ResponseEntity<List<Vendeur>> listerVendeurs() {
        return ResponseEntity.ok(adminService.listerVendeur());
    }

    // Obtenir un vendeur par ID
    @GetMapping("/admin/recuperer-vendeurs/id/{id}")
    public ResponseEntity<Vendeur> obtenirVendeurParId(@PathVariable Long id) {
        return adminService.obtenirVendeurParId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Obtenir un vendeur par email
    @GetMapping("/admin/recuperer-vendeurs/email/{email}")
    public ResponseEntity<Vendeur> obtenirVendeurParEmail(@PathVariable String email) {
        return adminService.obtenirVendeurParEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Supprimer un vendeur par ID
    @DeleteMapping("/admin/supprimer-vendeurs/id/{id}")
    public ResponseEntity<Void> supprimerVendeurParId(@PathVariable Long id) {
        adminService.supprimerVendeurParId(id);
        return ResponseEntity.noContent().build();
    }

    // Supprimer un vendeur par email
    @DeleteMapping("/admin/supprimer-vendeurs/email/{email}")
    public ResponseEntity<Void> supprimerVendeurParEmail(@PathVariable String email) {
        adminService.supprimerVendeurParEmail(email);
        return ResponseEntity.noContent().build();
    }
}
