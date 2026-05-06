package com.asprineminds.gallery.security;

import com.asprineminds.gallery.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	private final UserRepository repo;

	public UserDetailsServiceImpl(UserRepository repo) {
		this.repo = repo;
	}

	public UserDetails loadUserByUsername(String email) {
		com.asprineminds.gallery.entity.User u = repo.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		return new User(u.getEmail(), u.getPassword(),
				Collections.singleton(new SimpleGrantedAuthority(u.getRole().name())));
	}
}
