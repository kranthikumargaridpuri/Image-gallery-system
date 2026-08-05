package com.asprineminds.gallery.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromAddress;

    @Value("${app.frontend.reset-password-url}")
    private String resetPasswordUrl;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendPasswordResetEmail(String recipientEmail, String username, String token) {
        String resetLink = resetPasswordUrl + "?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(recipientEmail);
        message.setSubject("Reset your Image Gallery password");
        message.setText(
                "Hello " + (username == null ? "User" : username) + ",\n\n" +
                "We received a request to reset your password.\n\n" +
                "Open this link to set a new password:\n" + resetLink + "\n\n" +
                "This link expires in 15 minutes. If you did not request this, you can ignore this email.\n\n" +
                "Regards,\nAsprineMinds"
        );

        mailSender.send(message);
    }
}
