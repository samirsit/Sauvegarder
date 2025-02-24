package com.boutique.controller;

import com.boutique.model.Client;
import com.boutique.service.ClientServiceImp;
import com.boutique.service.ClientServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientServiceInterface clientServiceInterface;

    // Ajouter un client
    @PostMapping(path = "/creer-clients")
    public ResponseEntity<Client> enregistrerClient(@RequestBody Client client) {
        Client nouveauClient = clientServiceInterface.enregistrerClient(client);
        return ResponseEntity.ok(nouveauClient);
    }

    // Mettre à jour un client
    @PutMapping("/modifier-clients/{email}")
    public ResponseEntity<Client> mettreAJourClient(@PathVariable String email, @RequestBody Client client) {
        Client clientMisAJour = clientServiceInterface.mettreAJourClient(email, client);
        return ResponseEntity.ok(clientMisAJour);
    }

    // Supprimer un client
    @DeleteMapping("/supprimer-clients/{email}")
    public ResponseEntity<Void> supprimerClient(@PathVariable String email) {
        clientServiceInterface.supprimerClient(email);
        return ResponseEntity.noContent().build();
    }

}
