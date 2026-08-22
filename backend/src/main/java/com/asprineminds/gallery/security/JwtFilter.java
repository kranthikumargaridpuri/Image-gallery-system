package com.asprineminds.gallery.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwt;
    private final UserDetailsServiceImpl uds;

    public JwtFilter(JwtUtil jwt, UserDetailsServiceImpl uds) {
        this.jwt = jwt;
        this.uds = uds;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest req,
            HttpServletResponse res,
            FilterChain chain
    ) throws ServletException, IOException {

        String path = req.getRequestURI();

        // Login/register/password-reset endpoints must stay usable even if the
        // browser still has an old token in localStorage.
        if (path != null && path.startsWith("/api/auth/")) {
            chain.doFilter(req, res);
            return;
        }

        String header = req.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7).trim();

            if (token.isEmpty() || !jwt.valid(token)) {
                rejectExpiredOrInvalidToken(res);
                return;
            }

            try {
                String email = jwt.email(token);
                UserDetails userDetails = uds.loadUserByUsername(email);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(req)
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception ex) {
                SecurityContextHolder.clearContext();
                rejectExpiredOrInvalidToken(res);
                return;
            }
        }

        chain.doFilter(req, res);
    }

    private void rejectExpiredOrInvalidToken(HttpServletResponse res) throws IOException {
        SecurityContextHolder.clearContext();
        res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.getWriter().write(
                "{\"status\":401,\"error\":\"Unauthorized\",\"message\":\"Session expired. Please login again.\"}"
        );
    }
}
