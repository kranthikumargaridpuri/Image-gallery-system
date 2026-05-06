package com.asprineminds.gallery.controller;

import com.asprineminds.gallery.dto.Dtos.CategoryRequest;
import com.asprineminds.gallery.dto.Dtos.CategoryResponse;
import com.asprineminds.gallery.entity.Category;
import com.asprineminds.gallery.repository.CategoryRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryRepository repo;
    public CategoryController(CategoryRepository repo) { this.repo = repo; }
    @GetMapping public List<CategoryResponse> all() {
        List<CategoryResponse> out = new ArrayList<CategoryResponse>();
        for (Category c : repo.findAll()) out.add(new CategoryResponse(c.getId(), c.getName(), c.getDescription()));
        return out;
    }
    @PostMapping @PreAuthorize("hasRole('ADMIN')") public CategoryResponse add(@Valid @RequestBody CategoryRequest r) {
        Category c = new Category(); c.setName(r.name); c.setDescription(r.description); c = repo.save(c);
        return new CategoryResponse(c.getId(), c.getName(), c.getDescription());
    }
}
