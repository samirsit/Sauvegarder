package com.e_commerce.Authentification;

import com.e_commerce.Model.Client;
import com.e_commerce.Model.Utilisateur;
import com.e_commerce.Model.Vendeur;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Authentification extends Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Client client;

    @OneToOne
    private Vendeur vendeur;
}
