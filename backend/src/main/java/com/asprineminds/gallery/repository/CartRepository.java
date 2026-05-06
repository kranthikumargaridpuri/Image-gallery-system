package com.asprineminds.gallery.repository;

import com.asprineminds.gallery.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface CartRepository extends JpaRepository<CartItem, Long> {
	List<CartItem> findByUserId(Long userId);

	Optional<CartItem> findByUserIdAndImageId(Long userId, Long imageId);

	void deleteByUserIdAndImageId(Long userId, Long imageId);
}
