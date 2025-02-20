package com.boutique.controller;

import com.boutique.model.Client;
import com.boutique.service.ClientServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientServiceImp clientService;

    // Ajouter un client
    @PostMapping(path = "/creer-clients")
    public ResponseEntity<Client> enregistrerClient(@RequestBody Client client) {
        Client nouveauClient = clientService.enregistrerClient(client);
        return ResponseEntity.ok(nouveauClient);
    }

    // Mettre à jour un client
    @PutMapping("/modifier-clients/{email}")
    public ResponseEntity<Client> mettreAJourClient(@PathVariable String email, @RequestBody Client client) {
        Client clientMisAJour = clientService.mettreAJourClient(email, client);
        return ResponseEntity.ok(clientMisAJour);
    }

    // Supprimer un client
    @DeleteMapping("/supprimer-clients/{email}")
    public ResponseEntity<Void> supprimerClient(@PathVariable String email) {
        clientService.supprimerClient(email);
        return ResponseEntity.noContent().build();
    }

}
