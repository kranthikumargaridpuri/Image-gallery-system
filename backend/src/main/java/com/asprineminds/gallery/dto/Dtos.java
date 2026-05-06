package com.asprineminds.gallery.dto;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

public class Dtos {
	public static class RegisterRequest {
		@NotBlank
		public String username;
		@Email
		@NotBlank
		public String email;
		@NotBlank
		@Size(min = 6)
		public String password;
	}

	public static class LoginRequest {
		@NotBlank
		public String email;
		@NotBlank
		public String password;
	}

	public static class AuthResponse {
		public String token, username, email, role;

		public AuthResponse(String token, String username, String email, String role) {
			this.token = token;
			this.username = username;
			this.email = email;
			this.role = role;
		}
	}

	public static class CategoryRequest {
		@NotBlank
		public String name;
		public String description;
	}

	public static class CategoryResponse {
		public Long id;
		public String name;
		public String description;

		public CategoryResponse(Long id, String name, String description) {
			this.id = id;
			this.name = name;
			this.description = description;
		}
	}

	public static class ImageResponse {
		public Long id, categoryId;
		public String name, description, imageUrl, categoryName;
		public LocalDateTime createdAt;
	}

	public static class CartResponse {
		public Long id;
		public ImageResponse image;

		public CartResponse(Long id, ImageResponse image) {
			this.id = id;
			this.image = image;
		}
	}

	public static class ApiResponse {
		public String message;

		public ApiResponse(String message) {
			this.message = message;
		}
	}
}
