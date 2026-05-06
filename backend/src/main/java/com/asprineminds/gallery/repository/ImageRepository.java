package com.asprineminds.gallery.repository;

import com.asprineminds.gallery.entity.GalleryImage;
import org.springframework.data.jpa.repository.*;
import java.util.*;

public interface ImageRepository extends JpaRepository<GalleryImage, Long> {
	@Query("select i from GalleryImage i where lower(i.name) like lower(concat('%',:q,'%')) or lower(i.description) like lower(concat('%',:q,'%'))")
	List<GalleryImage> search(String q);

	List<GalleryImage> findByCategoryId(Long categoryId);
}
