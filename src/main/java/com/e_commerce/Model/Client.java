package com.e_commerce.Model;

import com.e_commerce.Authentification.Authentification;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Client extends Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY)
    private List<Commande> commandes;

    @OneToOne(mappedBy = "client")
    private Authentification authentification;
}
