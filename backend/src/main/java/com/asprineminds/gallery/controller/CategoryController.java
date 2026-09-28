package com.asprineminds.gallery.controller;

import com.asprineminds.gallery.dto.Dtos.CategoryRequest;
import com.asprineminds.gallery.dto.Dtos.CategoryResponse;
import com.asprineminds.gallery.entity.Category;
import com.asprineminds.gallery.repository.CategoryRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import com.asprineminds.gallery.repository.ImageRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import java.util.Collections;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
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

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.status(404).body(Collections.singletonMap("message", "Category not found."));
        }
        if (images.existsByCategoryId(id)) {
            return ResponseEntity.status(409).body(Collections.singletonMap("message",
                    "This category contains images. Move or delete those images before deleting the category."));
        }
        try {
            // Repository deletion commits before returning; the database foreign key
            // also protects images added concurrently after the check above.
            repo.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(409).body(Collections.singletonMap("message",
                    "This category is still in use. Remove its references before deleting it."));
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
