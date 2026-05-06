package com.asprineminds.gallery.config;

import com.asprineminds.gallery.entity.Category;
import com.asprineminds.gallery.entity.Role;
import com.asprineminds.gallery.entity.User;
import com.asprineminds.gallery.repository.CategoryRepository;
import com.asprineminds.gallery.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {
	private final UserRepository users;
	private final CategoryRepository cats;
	private final PasswordEncoder enc;

	public DataSeeder(UserRepository users, CategoryRepository cats, PasswordEncoder enc) {
		this.users = users;
		this.cats = cats;
		this.enc = enc;
	}

	public void run(String... args) {
		if (!users.existsByEmail("admin@gallery.com")) {
			User admin = new User();
			admin.setUsername("admin");
			admin.setEmail("admin@gallery.com");
			admin.setPassword(enc.encode("admin123"));
			admin.setRole(Role.ROLE_ADMIN);
			users.save(admin);
		}
		if (!cats.existsByName("Nature")) {
			Category c = new Category();
			c.setName("Nature");
			c.setDescription("Nature images");
			cats.save(c);
		}
		if (!cats.existsByName("Art")) {
			Category c = new Category();
			c.setName("Art");
			c.setDescription("Art images");
			cats.save(c);
		}
	}
}
