package com.asprineminds.gallery.controller;

import com.asprineminds.gallery.dto.Dtos.AuthResponse;
import com.asprineminds.gallery.dto.Dtos.LoginRequest;
import com.asprineminds.gallery.dto.Dtos.RegisterRequest;
import com.asprineminds.gallery.entity.Role;
import com.asprineminds.gallery.entity.User;
import com.asprineminds.gallery.repository.UserRepository;
import com.asprineminds.gallery.security.JwtUtil;
import com.asprineminds.gallery.service.EmailService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository repo;
    private final PasswordEncoder enc;
    private final AuthenticationManager auth;
    private final JwtUtil jwt;
    private final EmailService emailService;

    public AuthController(UserRepository repo, PasswordEncoder enc, AuthenticationManager auth, JwtUtil jwt, EmailService emailService) {
        this.repo = repo;
        this.enc = enc;
        this.auth = auth;
        this.jwt = jwt;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest r) {
        if (repo.existsByEmail(r.email)) {
            throw new RuntimeException("Email already exists");
        }

        User u = new User();
        u.setUsername(r.username);
        u.setEmail(r.email);
        u.setPassword(enc.encode(r.password));
        u.setRole(Role.ROLE_USER);

        u = repo.save(u);

        return new AuthResponse(
                jwt.generate(u.getEmail(), u.getRole().name()),
                u.getUsername(),
                u.getEmail(),
                u.getRole().name()
        );
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest r) {
        auth.authenticate(new UsernamePasswordAuthenticationToken(r.email, r.password));

        User u = repo.findByEmail(r.email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new AuthResponse(
                jwt.generate(u.getEmail(), u.getRole().name()),
                u.getUsername(),
                u.getEmail(),
                u.getRole().name()
        );
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        repo.findByEmail(email.trim().toLowerCase()).ifPresent(user -> {
            String token = UUID.randomUUID().toString();
            user.setResetToken(token);
            user.setResetTokenExpiry(System.currentTimeMillis() + 15 * 60 * 1000);
            repo.save(user);

            try {
                emailService.sendPasswordResetEmail(user.getEmail(), user.getUsername(), token);
            } catch (RuntimeException ex) {
                user.setResetToken(null);
                user.setResetTokenExpiry(null);
                repo.save(user);
                throw ex;
            }
        });

        Map<String, String> res = new HashMap<>();
        res.put("message", "If the email is registered, a password reset link has been sent.");
        return ResponseEntity.ok(res);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> req) {
        String token = req.get("token");
        String newPassword = req.get("newPassword");

        if (token == null || token.trim().isEmpty()) {
            throw new RuntimeException("Reset token is required");
        }
        if (newPassword == null || newPassword.length() < 8) {
            throw new RuntimeException("Password must contain at least 8 characters");
        }

        User user = repo.findByResetToken(token.trim())
                .orElseThrow(() -> new RuntimeException("Invalid or already used reset link"));

        if (user.getResetTokenExpiry() == null || user.getResetTokenExpiry() < System.currentTimeMillis()) {
            user.setResetToken(null);
            user.setResetTokenExpiry(null);
            repo.save(user);
            throw new RuntimeException("Reset link has expired. Please request a new one.");
        }

        user.setPassword(enc.encode(newPassword));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        repo.save(user);

        Map<String, String> res = new HashMap<>();
        res.put("message", "Password reset successful");
        return ResponseEntity.ok(res);
    }

}