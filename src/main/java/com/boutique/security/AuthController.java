package com.boutique.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {


    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UtilisateurDetailsService utilisateurDetailsService;

    /**
     * Inscription d'un nouvel utilisateur
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        Utilisateur utilisateur = authService.registerUser(
                request.getEmail(),
                request.getUsername(),
                request.getPassword(),
                request.getRole());

        return ResponseEntity.ok("Utilisateur enregistré avec succès !");
    }

    /**
     * Authentification et génération de tokens
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = utilisateurDetailsService.loadUserByUsername(request.getEmail());

        String accessToken = jwtUtil.generateToken(userDetails, false);
        String refreshToken = jwtUtil.generateToken(userDetails, true);

        return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken));
    }

    /**
     * Rafraîchir le token d'accès avec le refresh token
     */
    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody RefreshRequest request) {
        String refreshToken = request.getRefreshToken();
        String username = jwtUtil.getUsernameFromToken(refreshToken);

        UserDetails userDetails = utilisateurDetailsService.loadUserByUsername(username);

        if (!jwtUtil.validateToken(refreshToken, userDetails)) {
            return ResponseEntity.badRequest().body(new AuthResponse(null, "Refresh token invalide"));
        }

        String newAccessToken = jwtUtil.generateToken(userDetails, false);

        return ResponseEntity.ok(new AuthResponse(newAccessToken, refreshToken));
    }
}
