package com.asprineminds.gallery.service;

import com.asprineminds.gallery.dto.Dtos.ImageResponse;
import com.asprineminds.gallery.entity.Category;
import com.asprineminds.gallery.entity.GalleryImage;
import com.asprineminds.gallery.repository.CategoryRepository;
import com.asprineminds.gallery.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImageService {
	private final ImageRepository images;
	private final CategoryRepository cats;
	@Value("${app.upload.dir:uploads}")
	private String uploadDir;

	public ImageService(ImageRepository images, CategoryRepository cats) {
		this.images = images;
		this.cats = cats;
	}

	public ImageResponse upload(String name, String desc, Long catId, MultipartFile file) throws Exception {
		Category c = cats.findById(catId).orElseThrow(() -> new RuntimeException("Category not found"));
		Files.createDirectories(Paths.get(uploadDir));
		String original = file.getOriginalFilename() == null ? "image" : file.getOriginalFilename();
		String fn = System.currentTimeMillis() + "_" + original.replaceAll("[^a-zA-Z0-9._-]", "_");
		Path p = Paths.get(uploadDir, fn);
		Files.copy(file.getInputStream(), p, StandardCopyOption.REPLACE_EXISTING);
		GalleryImage gi = new GalleryImage();
		gi.setName(name);
		gi.setDescription(desc);
		gi.setCategory(c);
		gi.setFileName(fn);
		gi.setImageUrl("/uploads/" + fn);
		gi.setContentType(file.getContentType());
		gi.setSizeBytes(file.getSize());
		return map(images.save(gi));
	}

	public List<ImageResponse> all() {
		List<ImageResponse> out = new ArrayList<ImageResponse>();
		for (GalleryImage i : images.findAll())
			out.add(map(i));
		return out;
	}

	public List<ImageResponse> search(String q) {
		List<ImageResponse> out = new ArrayList<ImageResponse>();
		for (GalleryImage i : images.search(q))
			out.add(map(i));
		return out;
	}

	public List<ImageResponse> byCat(Long id) {
		List<ImageResponse> out = new ArrayList<ImageResponse>();
		for (GalleryImage i : images.findByCategoryId(id))
			out.add(map(i));
		return out;
	}

	public void delete(Long id) {
		images.deleteById(id);
	}

	public ImageResponse map(GalleryImage i) {
		ImageResponse r = new ImageResponse();
		r.id = i.getId();
		r.name = i.getName();
		r.description = i.getDescription();
		r.imageUrl = i.getImageUrl();
		r.createdAt = i.getCreatedAt();
		if (i.getCategory() != null) {
			r.categoryId = i.getCategory().getId();
			r.categoryName = i.getCategory().getName();
		}
		return r;
	}
}
