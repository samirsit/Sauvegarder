package com.boutique.service;


import com.boutique.model.Vendeur;
import com.boutique.repository.VendeurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VendeurServiceImpl implements VendeurServiceInterface {

    private final VendeurRepository vendeurRepository;

    @Override
    public Vendeur enregistrerVendeur(Vendeur vendeur) {
        return vendeurRepository.save(vendeur);
    }

    @Override
    public Vendeur mettreAJourVendeur(String email, Vendeur vendeur) {
        return vendeurRepository.findByEmail(email).map(Vendeur -> {
            Vendeur.setNom(vendeur.getNom());
            Vendeur.setPrenom(vendeur.getPrenom());
            Vendeur.setEmail(vendeur.getEmail());
            Vendeur.setNomSociete(vendeur.getNomSociete());
            Vendeur.setTelephone(vendeur.getTelephone());
            return vendeurRepository.save(vendeur) ;
        }).orElseThrow(() -> new RuntimeException("Vendeur non trouvé !"));
    }

    @Override
    public void supprimerVendeur(String email) {
        if (!vendeurRepository.existsByEmail(email)) {  // Vérifie l'existence du client par email
            throw new RuntimeException("Client non trouvé !");
        }
        vendeurRepository.deleteByEmail(email);  // Suppression du client par email
    }


    /*private final ProduitRepository produitRepository;
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
    }*/
}
