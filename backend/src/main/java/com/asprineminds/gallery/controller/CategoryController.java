package com.asprineminds.gallery.controller;

import com.asprineminds.gallery.dto.Dtos.CategoryRequest;
import com.asprineminds.gallery.dto.Dtos.CategoryResponse;
import com.asprineminds.gallery.entity.Category;
import com.asprineminds.gallery.repository.CategoryRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import com.asprineminds.gallery.repository.ImageRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import java.util.Optional;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryRepository repo;
    private final ImageRepository images;
    public CategoryController(CategoryRepository repo, ImageRepository images) {
        this.repo = repo;
        this.images = images;
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> delete(@PathVariable("id") Long id, Authentication authentication) {
        // Explicit check: this application's category routes are public and
        // method-security annotations are not enabled in the supplied source.
        if (authentication == null || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login again.");
        }
        boolean admin = false;
        for (GrantedAuthority authority : authentication.getAuthorities()) {
            if ("ROLE_ADMIN".equals(authority.getAuthority())
                    || "ROLE_SUPER_ADMIN".equals(authority.getAuthority())) {
                admin = true;
                break;
            }
        }
        if (!admin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only administrators can delete categories.");
        }
        Optional<Category> category = repo.findById(id);
        if (!category.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found. Refresh the category list.");
        }
        if (images.findByCategoryId(id, PageRequest.of(0, 1)).hasContent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("This category contains images. Move or delete those images before deleting the category.");
        }
        try {
            // Repository deletion commits before returning; FK conflicts are
            // caught here, including references added after the check above.
            repo.delete(category.get());
        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("This category is still in use. Remove its references before deleting it.");
        }
        return ResponseEntity.noContent().build();
    }
    @GetMapping public List<CategoryResponse> all() {
        List<CategoryResponse> out = new ArrayList<CategoryResponse>();
        for (Category c : repo.findAll(Sort.by(Sort.Direction.ASC, "id"))) out.add(new CategoryResponse(c.getId(), c.getName(), c.getDescription()));
        return out;
    }
    @PostMapping @PreAuthorize("hasRole('ADMIN')") public CategoryResponse add(@Valid @RequestBody CategoryRequest r) {
        Category c = new Category(); c.setName(r.name); c.setDescription(r.description); c = repo.save(c);
        return new CategoryResponse(c.getId(), c.getName(), c.getDescription());
    }
}
