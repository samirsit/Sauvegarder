package com.boutique.service;

import com.boutique.model.Client;
import com.boutique.model.Vendeur;

import java.util.List;
import java.util.Optional;

public interface AdminServiceInterface {

    // Coté client :
    Client enregistrerClient(Client client);
    List<Client> listerClients();
    Optional<Client> obtenirClientParId(Long id);
    Optional<Client> obtenirClientParEmail(String email);
    void supprimerClientParId(Long id);
    void supprimerClientParEmail(String email);

    //Coté vendeur :

    Vendeur enregistrerVendeur(Vendeur vendeur);
    List<Vendeur> listerVendeur();
    Optional<Vendeur> obtenirVendeurParId(Long id);
    Optional<Vendeur> obtenirVendeurParEmail(String email);
    void supprimerVendeurParId(Long id);
    void supprimerVendeurParEmail(String email);
}
