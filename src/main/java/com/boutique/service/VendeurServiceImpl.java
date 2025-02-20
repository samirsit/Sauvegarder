package com.boutique.service;

import com.boutique.model.Produit;
import com.boutique.repository.ProduitRepository;
import com.boutique.repository.VendeurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VendeurServiceImpl implements VendeurServiceInterface {

    private ProduitRepository produitRepository;
    private VendeurRepository vendeurRepository;

    @Override
    public Produit ajouterProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    @Override
    public List<Produit> getProduitsParVendeur(String email) {
        return produitRepository.findByVendeurEmail(email);  // Appel à la méthode du repository
    }


    @Override
    public Produit mettreAJourProduit(Long id, Produit produit) {
        return produitRepository.findById(id).map(prod -> {
                    prod.setCategorie(produit.getCategorie());
                    prod.setVendeur(produit.getVendeur());
                    prod.setCategorie(produit.getCategorie());
                    prod.setNomProduit(produit.getNomProduit());
                    prod.setPrix(produit.getPrix());
                    return produitRepository.save(produit);
                })
                .orElseThrow(() -> new RuntimeException("Produit non trouvé !"));
    }

    @Override
    public void supprimerProduit(Long id) {
        if (!produitRepository.existsById(id)) {  // Vérifie l'existence du client par email
            throw new RuntimeException("Client non trouvé !");
        }
        produitRepository.deleteById(id);  // Suppression du client par email
    }
}

