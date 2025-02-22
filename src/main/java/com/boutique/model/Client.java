package com.boutique.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@Entity
@Table(name = "clients")
@Data
@NoArgsConstructor @AllArgsConstructor
public class Client {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String nom;
    private String prenom;
    private String email;
    private String telephone;


    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Commande> commandes;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "adresse_id", referencedColumnName = "adresseId") // Correction ici
    private Adresse adresse;

}
