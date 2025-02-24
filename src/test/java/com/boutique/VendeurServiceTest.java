package com.boutique;

import com.boutique.model.Vendeur;
import com.boutique.repository.VendeurRepository;
import com.boutique.service.VendeurServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)  // Permet d’utiliser Mockito
class VendeurServiceTest {

    @Mock
    private VendeurRepository vendeurRepository;  // Mock du repository

    @InjectMocks
    private VendeurServiceImpl vendeurService;  // Injection du mock dans le service

    private Vendeur vendeur;

    @BeforeEach
    void setUp() {
        vendeur = new Vendeur();
        vendeur.setNom("Dupont");
        vendeur.setPrenom("Jean");
        vendeur.setEmail("jean.dupont@example.com");
        vendeur.setNomSociete("Boutique Paris");
        vendeur.setTelephone("0606060606");
    }

    // ✅ TEST : Enregistrer un vendeur
    @Test
    void testEnregistrerVendeur() {
        when(vendeurRepository.save(any(Vendeur.class))).thenReturn(vendeur);

        Vendeur savedVendeur = vendeurService.enregistrerVendeur(vendeur);

        assertNotNull(savedVendeur);
        assertEquals("jean.dupont@example.com", savedVendeur.getEmail());
        verify(vendeurRepository, times(1)).save(any(Vendeur.class));
    }

    // ✅ TEST : Mettre à jour un vendeur existant
    @Test
    void testMettreAJourVendeur() {
        Vendeur vendeurMisAJour = new Vendeur();
        vendeurMisAJour.setNom("Durand");
        vendeurMisAJour.setPrenom("Paul");
        vendeurMisAJour.setEmail("jean.dupont@example.com");
        vendeurMisAJour.setNomSociete("Boutique Lyon");
        vendeurMisAJour.setTelephone("0707070707");

        when(vendeurRepository.findByEmail("jean.dupont@example.com")).thenReturn(Optional.of(vendeur));
        when(vendeurRepository.save(any(Vendeur.class))).thenReturn(vendeurMisAJour);

        Vendeur updatedVendeur = vendeurService.mettreAJourVendeur("jean.dupont@example.com", vendeurMisAJour);

        assertNotNull(updatedVendeur);
        assertEquals("Durand", updatedVendeur.getNom());
        assertEquals("Boutique Lyon", updatedVendeur.getNomSociete());
        verify(vendeurRepository, times(1)).findByEmail("jean.dupont@example.com");
        verify(vendeurRepository, times(1)).save(any(Vendeur.class));
    }

    // ✅ TEST : Supprimer un vendeur existant
    @Test
    void testSupprimerVendeur() {
        when(vendeurRepository.existsByEmail("jean.dupont@example.com")).thenReturn(true);

        vendeurService.supprimerVendeur("jean.dupont@example.com");

        verify(vendeurRepository, times(1)).deleteByEmail("jean.dupont@example.com");
    }

    // ❌ TEST : Supprimer un vendeur inexistant (erreur attendue)
    @Test
    void testSupprimerVendeurNonExistant() {
        when(vendeurRepository.existsByEmail("notfound@example.com")).thenReturn(false);

        Exception exception = assertThrows(RuntimeException.class, () -> {
            vendeurService.supprimerVendeur("notfound@example.com");
        });

        assertEquals("Client non trouvé !", exception.getMessage());
        verify(vendeurRepository, never()).deleteByEmail("notfound@example.com");
    }
}
