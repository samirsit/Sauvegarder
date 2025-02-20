package com.boutique.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "vendeur")
@Data
@NoArgsConstructor @AllArgsConstructor
public class Vendeur extends User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "vendeur", fetch = FetchType.LAZY)
    private List<Produit> produits;

}
