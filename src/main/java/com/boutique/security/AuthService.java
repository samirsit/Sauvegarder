/*package com.boutique.security;

import com.boutique.security.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements IAuthService {

    @Autowired
    private UsersRepository utilisateurRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Users registerUser(String email, String username, String password, Role role) {
        if (utilisateurRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email déjà utilisé !");
        }

        Users user = new Users();
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);

        return utilisateurRepository.save(user);
    }
}*/
