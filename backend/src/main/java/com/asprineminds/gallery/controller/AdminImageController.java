package com.asprineminds.gallery.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.asprineminds.gallery.dto.Dtos.ImageResponse;
import com.asprineminds.gallery.service.ImageService;

/**
 * Admin-only Manage Images pagination/filter API.
 *
 * SecurityConfig already protects all /api/admin/** endpoints with ROLE_ADMIN.
 */
@RestController
@RequestMapping("/api/admin/images")
public class AdminImageController {

    private final ImageService imageService;

    public AdminImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    /**
     * ALL categories:
     * GET /api/admin/images/page?page=0&size=10
     *
     * One category:
     * GET /api/admin/images/page?page=0&size=10&categoryId=3
     *
     * Results are newest first.
     */
    @GetMapping("/page")
    public Page<ImageResponse> page(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "categoryId", required = false) Long categoryId) {

        return imageService.adminPage(page, size, categoryId);
    }
}
