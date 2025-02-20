package com.boutique.service;

import com.boutique.model.Client;
import com.boutique.model.Vendeur;
import com.boutique.repository.ClientRepository;
import com.boutique.repository.VendeurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminServiceInterface{

    private ClientRepository clientRepository;
    private VendeurRepository vendeurRepository;


    // Client
    @Override
    public Client enregistrerClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public List<Client> listerClients() {
        return clientRepository.findAll();
    }

    @Override
    public Optional<Client> obtenirClientParId(Long id) {
        return clientRepository.findById(id);
    }

    @Override
    public Optional<Client> obtenirClientParEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    @Override
    public void supprimerClientParId(Long id) {
        if (!clientRepository.existsById(id)){
            throw new RuntimeException("Client non trouvé");
        }
        clientRepository.deleteById(id);
    }

    @Override
    public void supprimerClientParEmail(String email) {
        if (!clientRepository.existsByEmail(email)){
            throw new RuntimeException("Client non trouvé");
        }
        clientRepository.deleteByEmail(email);
    }

    //Vendeur

    @Override
    public Vendeur enregistrerVendeur(Vendeur vendeur) {
        return vendeurRepository.save(vendeur);
    }

    @Override
    public List<Vendeur> listerVendeur() {
        return vendeurRepository.findAll();
    }

    @Override
    public Optional<Vendeur> obtenirVendeurParId(Long id) {
        return vendeurRepository.findById(id);
    }

    @Override
    public Optional<Vendeur> obtenirVendeurParEmail(String email) {
        return vendeurRepository.findByEmail(email);
    }

    @Override
    public void supprimerVendeurParId(Long id) {
        if (!vendeurRepository.existsById(id)){
            throw new RuntimeException("Client non trouvé");
        }
        vendeurRepository.deleteById(id);
    }

    @Override
    public void supprimerVendeurParEmail(String email) {
        if (!vendeurRepository.existsByEmail(email)){
            throw new RuntimeException("Client non trouvé");
        }
        vendeurRepository.deleteByEmail(email);
    }
}
