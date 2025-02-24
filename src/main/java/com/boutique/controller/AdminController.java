package com.boutique.controller;

import com.boutique.model.Client;
import com.boutique.model.Vendeur;
import com.boutique.service.AdminServiceImpl;
import com.boutique.service.AdminServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminServiceInterface adminServiceInterface;

    // 🔹 CLIENTS

    @PostMapping("/clients")
    public ResponseEntity<Client> enregistrerClient(@RequestBody Client client) {
        return ResponseEntity.ok(adminServiceInterface.enregistrerClient(client));
    }

    @GetMapping("/clients")
    public ResponseEntity<List<Client>> listerClients() {
        return ResponseEntity.ok(adminServiceInterface.listerClients());
    }

    @GetMapping("/clients/{id}")
    public ResponseEntity<Client> obtenirClientParId(@PathVariable Long id) {
        return adminServiceInterface.obtenirClientParId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/clients/{id}")
    public ResponseEntity<Void> supprimerClientParId(@PathVariable Long id) {
        adminServiceInterface.supprimerClientParId(id);
        return ResponseEntity.noContent().build();
    }

    // 🔹 VENDEURS

    @PostMapping("/vendeurs")
    public ResponseEntity<Vendeur> enregistrerVendeur(@RequestBody Vendeur vendeur) {
        return ResponseEntity.ok(adminServiceInterface.enregistrerVendeur(vendeur));
    }

    @GetMapping("/vendeurs")
    public ResponseEntity<List<Vendeur>> listerVendeurs() {
        return ResponseEntity.ok(adminServiceInterface.listerVendeur());
    }

    @DeleteMapping("/vendeurs/{id}")
    public ResponseEntity<Void> supprimerVendeurParId(@PathVariable Long id) {
        adminServiceInterface.supprimerVendeurParId(id);
        return ResponseEntity.noContent().build();
    }
}
