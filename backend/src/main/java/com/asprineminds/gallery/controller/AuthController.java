package com.asprineminds.gallery.controller;

import com.asprineminds.gallery.dto.Dtos.AuthResponse;
import com.asprineminds.gallery.dto.Dtos.LoginRequest;
import com.asprineminds.gallery.dto.Dtos.RegisterRequest;
import com.asprineminds.gallery.entity.Role;
import com.asprineminds.gallery.entity.User;
import com.asprineminds.gallery.repository.UserRepository;
import com.asprineminds.gallery.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository repo; private final PasswordEncoder enc; private final AuthenticationManager auth; private final JwtUtil jwt;
    public AuthController(UserRepository repo, PasswordEncoder enc, AuthenticationManager auth, JwtUtil jwt) { this.repo = repo; this.enc = enc; this.auth = auth; this.jwt = jwt; }
    @PostMapping("/register") public AuthResponse register(@Valid @RequestBody RegisterRequest r) {
        if (repo.existsByEmail(r.email)) throw new RuntimeException("Email already exists");
        User u = new User(); u.setUsername(r.username); u.setEmail(r.email); u.setPassword(enc.encode(r.password)); u.setRole(Role.ROLE_USER); u = repo.save(u);
        return new AuthResponse(jwt.generate(u.getEmail(), u.getRole().name()), u.getUsername(), u.getEmail(), u.getRole().name());
    }
    @PostMapping("/login") public AuthResponse login(@Valid @RequestBody LoginRequest r) {
        auth.authenticate(new UsernamePasswordAuthenticationToken(r.email, r.password));
        User u = repo.findByEmail(r.email).orElseThrow(() -> new RuntimeException("User not found"));
        return new AuthResponse(jwt.generate(u.getEmail(), u.getRole().name()), u.getUsername(), u.getEmail(), u.getRole().name());
    }
}
