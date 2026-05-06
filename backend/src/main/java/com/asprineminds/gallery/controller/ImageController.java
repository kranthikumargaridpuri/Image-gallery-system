package com.asprineminds.gallery.controller;

import com.asprineminds.gallery.dto.Dtos.*;
import com.asprineminds.gallery.service.ImageService;
import org.springframework.core.io.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.*;
import java.util.*;

@RestController
public class ImageController {
	private final ImageService service;

	public ImageController(ImageService s) {
		service = s;
	}

	@GetMapping("/api/images")
	public List<ImageResponse> all() {
		return service.all();
	}

	@GetMapping("/api/images/search")
	public List<ImageResponse> search(@RequestParam String keyword) {
		return service.search(keyword);
	}

	@GetMapping("/api/images/category/{id}")
	public List<ImageResponse> byCat(@PathVariable Long id) {
		return service.byCat(id);
	}

	@PostMapping("/api/admin/images")
	@PreAuthorize("hasRole('ADMIN')")
	public ImageResponse upload(@RequestParam String name, @RequestParam(required = false) String description,
			@RequestParam Long categoryId, @RequestParam MultipartFile file) throws Exception {
		return service.upload(name, description, categoryId, file);
	}

	@DeleteMapping("/api/admin/images/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ApiResponse del(@PathVariable Long id) {
		service.delete(id);
		return new ApiResponse("Deleted");
	}

	@GetMapping("/uploads/{file:.+}")
	public ResponseEntity<Resource> file(@PathVariable String file) throws Exception {
		Resource r = new UrlResource(Paths.get("uploads").resolve(file).toUri());
		return ResponseEntity.ok().body(r);
	}
}
