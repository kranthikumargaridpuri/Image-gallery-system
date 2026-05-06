package com.asprineminds.gallery.repository;

import com.asprineminds.gallery.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	boolean existsByName(String name);
}
