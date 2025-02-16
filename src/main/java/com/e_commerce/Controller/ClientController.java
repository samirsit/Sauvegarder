package com.e_commerce.Controller;

import com.e_commerce.Model.Client;
import com.e_commerce.Model.Commande;
import com.e_commerce.Service.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/connecte/{email}")
    public Client getCurrentClient(@PathVariable String email) {
        return clientService.getCurrentClient(email);
    }

    @GetMapping("/{id}/commandes")
    public List<Commande> getOrderHistory(@PathVariable Long id) {
        return clientService.getOrderHistory(id);
    }

    @GetMapping
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @PutMapping("/{id}")
    public Client updateClient(@PathVariable Long id, @RequestBody Client clientUpdate) {
        return clientService.updateClient(id, clientUpdate);
    }

    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
    }

    @PostMapping("/ajouter")
    public Client addClient(@RequestBody Client client){
        return clientService.addClient(client);
    }
}
