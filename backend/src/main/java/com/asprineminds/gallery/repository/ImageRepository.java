package com.asprineminds.gallery.repository;

import com.asprineminds.gallery.entity.GalleryImage;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface ImageRepository extends JpaRepository<GalleryImage, Long> {
	
	@Query("SELECT i FROM GalleryImage i WHERE " +
		       "LOWER(i.name) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
		       "LOWER(i.description) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
		       "LOWER(i.imageCode) LIKE LOWER(CONCAT('%', :q, '%'))")
		List<GalleryImage> search(@Param("q") String q);
	

	List<GalleryImage> findByCategoryId(Long categoryId);
	Optional<GalleryImage> findByImageCode(String imageCode);
	boolean existsByImageCode(String imageCode);
}
