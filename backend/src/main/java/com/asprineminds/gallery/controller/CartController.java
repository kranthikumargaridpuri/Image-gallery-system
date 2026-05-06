package com.asprineminds.gallery.controller;

import com.asprineminds.gallery.dto.Dtos.ApiResponse;
import com.asprineminds.gallery.dto.Dtos.CartResponse;
import com.asprineminds.gallery.entity.CartItem;
import com.asprineminds.gallery.entity.GalleryImage;
import com.asprineminds.gallery.entity.User;
import com.asprineminds.gallery.repository.CartRepository;
import com.asprineminds.gallery.repository.ImageRepository;
import com.asprineminds.gallery.repository.UserRepository;
import com.asprineminds.gallery.service.ImageService;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    private final CartRepository carts; private final UserRepository users; private final ImageRepository images; private final ImageService mapper;
    public CartController(CartRepository carts, UserRepository users, ImageRepository images, ImageService mapper) { this.carts = carts; this.users = users; this.images = images; this.mapper = mapper; }
    private User user(Authentication a) { return users.findByEmail(a.getName()).orElseThrow(() -> new RuntimeException("User not found")); }
    @GetMapping public List<CartResponse> all(Authentication a) {
        User u = user(a); List<CartResponse> out = new ArrayList<CartResponse>();
        for (CartItem ci : carts.findByUserId(u.getId())) out.add(new CartResponse(ci.getId(), mapper.map(ci.getImage())));
        return out;
    }
    @PostMapping("/{imageId}") public ApiResponse add(@PathVariable Long imageId, Authentication a) {
        User u = user(a); GalleryImage img = images.findById(imageId).orElseThrow(() -> new RuntimeException("Image not found"));
        if (!carts.findByUserIdAndImageId(u.getId(), imageId).isPresent()) { CartItem item = new CartItem(); item.setUser(u); item.setImage(img); carts.save(item); }
        return new ApiResponse("Added to cart");
    }
    @DeleteMapping("/{imageId}") @Transactional public ApiResponse remove(@PathVariable Long imageId, Authentication a) { User u = user(a); carts.deleteByUserIdAndImageId(u.getId(), imageId); return new ApiResponse("Removed"); }
}
