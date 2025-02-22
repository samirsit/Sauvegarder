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

    @PostMapping("/clients")
    public ResponseEntity<Client> enregistrerClient(@RequestBody Client client) {
        return ResponseEntity.ok(adminService.enregistrerClient(client));
    }

    @GetMapping("/clients")
    public ResponseEntity<List<Client>> listerClients() {
        return ResponseEntity.ok(adminService.listerClients());
    }

    @GetMapping("/clients/{id}")
    public ResponseEntity<Client> obtenirClientParId(@PathVariable Long id) {
        return adminService.obtenirClientParId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/clients/{id}")
    public ResponseEntity<Void> supprimerClientParId(@PathVariable Long id) {
        adminService.supprimerClientParId(id);
        return ResponseEntity.noContent().build();
    }

    // 🔹 VENDEURS

    @PostMapping("/vendeurs")
    public ResponseEntity<Vendeur> enregistrerVendeur(@RequestBody Vendeur vendeur) {
        return ResponseEntity.ok(adminService.enregistrerVendeur(vendeur));
    }

    @GetMapping("/vendeurs")
    public ResponseEntity<List<Vendeur>> listerVendeurs() {
        return ResponseEntity.ok(adminService.listerVendeur());
    }

    @DeleteMapping("/vendeurs/{id}")
    public ResponseEntity<Void> supprimerVendeurParId(@PathVariable Long id) {
        adminService.supprimerVendeurParId(id);
        return ResponseEntity.noContent().build();
    }
}
