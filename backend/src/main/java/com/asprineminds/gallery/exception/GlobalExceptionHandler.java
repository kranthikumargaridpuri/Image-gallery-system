package com.asprineminds.gallery.exception;

import org.springframework.http.*;
import org.springframework.web.bind.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map<String, String>> ex(Exception e) {
		Map<String, String> m = new HashMap<>();
		m.put("message", e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(m);
	}
}
