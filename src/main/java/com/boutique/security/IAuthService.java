package com.boutique.security;



import com.boutique.security.Utilisateur;
import com.boutique.security.Role;

public interface IAuthService {
    Utilisateur registerUser(String email, String username, String password, Role role);
}
