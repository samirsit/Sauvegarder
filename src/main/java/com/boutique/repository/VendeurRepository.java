package com.boutique.repository;

import com.boutique.model.Vendeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VendeurRepository extends JpaRepository<Vendeur, Long> {
    Optional<Vendeur> findByEmail(String email);

    boolean existsByEmail(String email);

    void deleteByEmail(String email);
}