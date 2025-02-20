package com.boutique.security.service;

import com.boutique.security.model.Role;
import com.boutique.security.model.Users;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface JwtServiceInterface {
    UserDetails loadUserByUsername(String email) throws UsernameNotFoundException;
    Users registerUser(String email, String username, String password, Role role);
}
