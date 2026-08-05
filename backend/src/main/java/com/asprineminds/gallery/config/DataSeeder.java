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

    public DataSeeder(
            UserRepository users,
            CategoryRepository cats,
            PasswordEncoder enc
    ) {
        this.users = users;
        this.cats = cats;
        this.enc = enc;
    }

    @Override
    public void run(String... args) {

        boolean adminEmailExists =
                users.existsByEmail("admin@gallery.com");

        boolean adminUsernameExists =
                users.existsByUsername("admin");

        /*
         * Create the default admin only when neither the email
         * nor the username already exists.
         */
        if (!adminEmailExists && !adminUsernameExists) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@gallery.com");
            admin.setPassword(enc.encode("admin123"));
            admin.setRole(Role.ROLE_ADMIN);

            users.save(admin);
        }

        if (!cats.existsByName("Nature")) {
            Category nature = new Category();
            nature.setName("Nature");
            nature.setDescription("Nature images");

            cats.save(nature);
        }

        if (!cats.existsByName("Art")) {
            Category art = new Category();
            art.setName("Art");
            art.setDescription("Art images");

            cats.save(art);
        }
    }
}