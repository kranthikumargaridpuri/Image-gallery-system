package com.asprineminds.gallery.repository;

import com.asprineminds.gallery.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);

	Optional<User> findByUsername(String username);

	boolean existsByEmail(String email);

	boolean existsByUsername(String username);
	
	
	Optional<User> findByResetToken(String resetToken);
}
