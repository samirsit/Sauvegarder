package com.e_commerce.Service.interfac;

import com.e_commerce.Model.Client;
import com.e_commerce.Model.Commande;

import java.util.List;

public interface IClientService {
    Client getCurrentClient(String email);
    List<Commande> getOrderHistory(Long clientId);
    List<Client> getAllClients();
    Client updateClient(Long id, Client clientUpdate);
    void deleteClient(Long clientId);
    Client addClient (Client client);
}
