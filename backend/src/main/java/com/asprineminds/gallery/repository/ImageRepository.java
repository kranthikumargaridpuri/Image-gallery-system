package com.asprineminds.gallery.repository;

import com.asprineminds.gallery.entity.GalleryImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<GalleryImage, Long> {

    @Query("SELECT i FROM GalleryImage i WHERE " +
            "LOWER(i.name) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
            "LOWER(i.description) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
            "LOWER(i.imageCode) LIKE LOWER(CONCAT('%', :q, '%'))")
    List<GalleryImage> search(@Param("q") String q);

    // Existing public gallery method - kept so nothing else breaks.
    List<GalleryImage> findByCategoryId(Long categoryId);

    // Admin Manage Images: server-side pagination for one selected category.
    Page<GalleryImage> findByCategoryId(Long categoryId, Pageable pageable);

    Optional<GalleryImage> findByImageCode(String imageCode);

    boolean existsByImageCode(String imageCode);
}
