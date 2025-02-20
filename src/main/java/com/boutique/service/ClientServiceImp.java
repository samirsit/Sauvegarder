package com.boutique.service;

import com.boutique.model.Client;
import com.boutique.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClientServiceImp implements ClientServiceInterface {

    private final ClientRepository clientRepository;

    @Override
    public Client enregistrerClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client mettreAJourClient(String email, Client client) {
        return clientRepository.findByEmail(email).map(Client -> {
            Client.setNom(client.getNom());
            Client.setPrenom(client.getPrenom());
            Client.setAdresse(client.getAdresse());
            return clientRepository.save(client);
        }).orElseThrow(() -> new RuntimeException("Client non trouvé !"));
    }

    @Override
    public void supprimerClient(String email) {
        if (!clientRepository.existsByEmail(email)) {  // Vérifie l'existence du client par email
            throw new RuntimeException("Client non trouvé !");
        }
        clientRepository.deleteByEmail(email);  // Suppression du client par email
    }


}

