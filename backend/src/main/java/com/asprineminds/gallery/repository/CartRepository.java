package com.asprineminds.gallery.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asprineminds.gallery.entity.CartItem;

public interface CartRepository extends JpaRepository<CartItem, Long> {
	List<CartItem> findByUserId(Long userId);

	Optional<CartItem> findByUserIdAndImageId(Long userId, Long imageId);

	void deleteByUserIdAndImageId(Long userId, Long imageId);
	void deleteByImageId(Long imageId);
	
}
