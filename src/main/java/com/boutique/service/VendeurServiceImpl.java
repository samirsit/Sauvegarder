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

    private final ProduitRepository produitRepository;
    private final VendeurRepository vendeurRepository;

    @Override
    public Produit ajouterProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    @Override
    public List<Produit> getProduitsParVendeur(String email) {
        return produitRepository.findByVendeurEmail(email);
    }

    @Override
    public Produit mettreAJourProduit(Long id, Produit produit) {
        return produitRepository.findById(id).map(prod -> {
                    prod.setCategorie(produit.getCategorie());
                    prod.setVendeur(produit.getVendeur());
                    prod.setNomProduit(produit.getNomProduit());
                    prod.setPrix(produit.getPrix());
                    return produitRepository.save(prod);
                })
                .orElseThrow(() -> new RuntimeException("Produit non trouvé !"));
    }

    @Override
    public void supprimerProduit(Long id) {
        if (!produitRepository.existsById(id)) {
            throw new RuntimeException("Produit non trouvé !");
        }
        produitRepository.deleteById(id);
    }
}
