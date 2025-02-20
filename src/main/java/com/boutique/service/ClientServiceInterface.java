package com.boutique.service;

import com.boutique.model.Client;

import java.util.List;
import java.util.Optional;

public interface ClientServiceInterface {

    Client enregistrerClient(Client client);
    Client mettreAJourClient(String email, Client client);
    void supprimerClient(String email);
}
