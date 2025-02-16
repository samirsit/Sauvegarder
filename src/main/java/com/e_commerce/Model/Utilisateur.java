package com.e_commerce.Model;

import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass  // Pas d'annotation @Entity ici
public abstract class Utilisateur {
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
}
