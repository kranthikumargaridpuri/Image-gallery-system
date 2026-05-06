package com.asprineminds.gallery.security;

import org.springframework.security.authentication.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {
	private final JwtUtil jwt;
	private final UserDetailsServiceImpl uds;

	public JwtFilter(JwtUtil jwt, UserDetailsServiceImpl uds) {
		this.jwt = jwt;
		this.uds = uds;
	}

	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws ServletException, IOException {
		String h = req.getHeader("Authorization");
		if (h != null && h.startsWith("Bearer ")) {
			String t = h.substring(7);
			if (jwt.valid(t)) {
				UserDetails ud = uds.loadUserByUsername(jwt.email(t));
				UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(ud, null,
						ud.getAuthorities());
				auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
				SecurityContextHolder.getContext().setAuthentication(auth);
			}
		}
		chain.doFilter(req, res);
	}
}
