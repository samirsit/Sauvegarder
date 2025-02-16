package com.e_commerce.Service.service;

import com.e_commerce.Model.Client;
import com.e_commerce.Model.Commande;
import com.e_commerce.Repository.ClientRepository;
import com.e_commerce.Service.interfac.IClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService implements IClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public Client getCurrentClient(String email) {
        return clientRepository.findByEmail(email).orElse(null);
    }

    @Override
    public List<Commande> getOrderHistory(Long clientId) {
        return clientRepository.findById(clientId)
                .map(Client::getCommandes)
                .orElse(null);
    }

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public Client updateClient(Long clientId, Client clientUpdate) {
        Optional<Client> clientExistant = clientRepository.findById(clientId);

        if (clientExistant.isPresent()) {
            Client client = clientExistant.get();
            client.setNom(clientUpdate.getNom());
            client.setPrenom(clientUpdate.getPrenom());
            client.setEmail(clientUpdate.getEmail());  // Correction ici
            client.setMotDePasse(clientUpdate.getMotDePasse());  // Correction ici
            return clientRepository.save(client);  // Correction ici
        }

        return null;
    }

    @Override
    public void deleteClient(Long clientId) {
        clientRepository.deleteById(clientId);
    }

    @Override
    public Client addClient(Client client) {
        return clientRepository.save(client);
    }


}
