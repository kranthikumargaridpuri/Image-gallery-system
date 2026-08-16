package com.asprineminds.gallery.service;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.asprineminds.gallery.dto.Dtos.ImageResponse;
import com.asprineminds.gallery.entity.Category;
import com.asprineminds.gallery.entity.GalleryImage;
import com.asprineminds.gallery.repository.CartRepository;
import com.asprineminds.gallery.repository.CategoryRepository;
import com.asprineminds.gallery.repository.ImageRepository;

@Service
public class ImageService {

    private final ImageRepository images;
    private final CategoryRepository cats;
    private final CartRepository cartItems;

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    public ImageService(ImageRepository images, CategoryRepository cats, CartRepository cartItems) {
        this.images = images;
        this.cats = cats;
        this.cartItems = cartItems;
    }

    public ImageResponse upload(String name, String desc, Double cost, Long catId, MultipartFile file) throws Exception {
        Category c = cats.findById(catId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (cost == null || cost < 0) {
            throw new RuntimeException("Image cost cannot be negative");
        }

        Path uploadPath = Paths.get(uploadDir);
        Files.createDirectories(uploadPath);

        String original = file.getOriginalFilename() == null ? "image" : file.getOriginalFilename();
        String fn = System.currentTimeMillis() + "_" + original.replaceAll("[^a-zA-Z0-9._-]", "_");
        Path p = uploadPath.resolve(fn);

        Files.copy(file.getInputStream(), p, StandardCopyOption.REPLACE_EXISTING);

        // Generate a real JPG thumbnail for PDFs immediately after upload.
        if (isPdf(fn, file.getContentType())) {
            ensurePdfThumbnail(fn);
        }

        GalleryImage gi = new GalleryImage();
        gi.setName(name);
        gi.setDescription(desc);
        gi.setCost(cost);
        gi.setCategory(c);
        gi.setImageCode(generateImageCode(c.getName()));
        gi.setFileName(fn);
        gi.setOriginalFileName(original);
        gi.setImageUrl("/uploads/" + fn);
        gi.setContentType(file.getContentType());
        gi.setSizeBytes(file.getSize());

        return map(images.save(gi));
    }

    private String generateImageCode(String categoryName) {
        String prefix = "IMG";
        if (categoryName != null && categoryName.trim().length() >= 3) {
            prefix = categoryName.trim().substring(0, 3).toUpperCase();
        }

        String code;
        do {
            int number = 1000 + new Random().nextInt(9000);
            code = prefix + number;
        } while (images.existsByImageCode(code));
        return code;
    }

    public List<ImageResponse> all() {
        List<ImageResponse> out = new ArrayList<ImageResponse>();
        for (GalleryImage i : images.findAll()) {
            out.add(map(i));
        }
        return out;
    }

    public List<ImageResponse> search(String q) {
        List<ImageResponse> out = new ArrayList<ImageResponse>();
        for (GalleryImage i : images.search(q)) {
            out.add(map(i));
        }
        return out;
    }

    public ImageResponse getById(Long id) {
        GalleryImage img = images.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found"));
        return map(img);
    }

    public List<ImageResponse> byCat(Long id) {
        List<ImageResponse> out = new ArrayList<ImageResponse>();
        for (GalleryImage i : images.findByCategoryId(id)) {
            out.add(map(i));
        }
        return out;
    }

    @Transactional
    public void delete(Long id) {
        GalleryImage img = images.findById(id).orElse(null);
        if (img != null && img.getFileName() != null && isPdf(img.getFileName(), img.getContentType())) {
            try {
                Files.deleteIfExists(Paths.get(uploadDir).resolve(thumbnailFileName(img.getFileName())));
            } catch (IOException ignored) {
                // Database delete must still succeed even if thumbnail cleanup fails.
            }
        }
        cartItems.deleteByImageId(id);
        images.deleteById(id);
    }

    public ImageResponse map(GalleryImage i) {
        ImageResponse r = new ImageResponse();
        r.id = i.getId();
        r.name = i.getName();
        r.description = i.getDescription();
        r.cost = i.getCost();
        r.imageCode = i.getImageCode();
        r.imageUrl = i.getImageUrl();
        r.thumbnailUrl = resolveThumbnailUrl(i);
        r.originalFileName = resolveOriginalFileName(i);
        r.contentType = resolveContentType(i);
        r.sizeBytes = resolveSizeBytes(i);
        r.createdAt = i.getCreatedAt();

        if (i.getCategory() != null) {
            r.categoryId = i.getCategory().getId();
            r.categoryName = i.getCategory().getName();
        }
        return r;
    }

    public OriginalFileDownload getOriginalFile(Long id) throws IOException {
        GalleryImage image = images.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        String storedFileName = image.getFileName();
        if (storedFileName == null || storedFileName.trim().isEmpty()) {
            throw new IOException("Stored file name is missing");
        }

        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        Path filePath = uploadPath.resolve(storedFileName).normalize();

        // Prevent ../ path traversal from ever escaping the configured upload directory.
        if (!filePath.startsWith(uploadPath)) {
            throw new IOException("Invalid file path");
        }
        if (!Files.exists(filePath) || !Files.isRegularFile(filePath)) {
            throw new IOException("Original file not found: " + storedFileName);
        }

        String contentType = resolveContentType(image);
        long size = Files.size(filePath);
        String originalFileName = resolveOriginalFileName(image);

        return new OriginalFileDownload(filePath, originalFileName, contentType, size);
    }

    private String resolveOriginalFileName(GalleryImage image) {
        if (image.getOriginalFileName() != null && !image.getOriginalFileName().trim().isEmpty()) {
            return image.getOriginalFileName().trim();
        }

        String stored = image.getFileName();
        if (stored == null || stored.trim().isEmpty()) {
            return image.getName() == null ? "download" : image.getName();
        }

        // Older rows were stored as: 13-digit timestamp_original-file-name.ext
        // Recover the old uploaded name when possible without altering the stored bytes.
        return Pattern.compile("^\\d{13}_").matcher(stored).replaceFirst("");
    }

    private String resolveContentType(GalleryImage image) {
        if (image.getContentType() != null && !image.getContentType().trim().isEmpty()) {
            return image.getContentType().trim();
        }

        try {
            if (image.getFileName() != null) {
                Path path = Paths.get(uploadDir).resolve(image.getFileName()).normalize();
                String detected = Files.probeContentType(path);
                if (detected != null && !detected.trim().isEmpty()) {
                    return detected;
                }
            }
        } catch (Exception ignored) {
            // Fall through to binary if the operating system cannot detect the MIME type.
        }
        return "application/octet-stream";
    }

    private Long resolveSizeBytes(GalleryImage image) {
        if (image.getSizeBytes() != null && image.getSizeBytes() >= 0) {
            return image.getSizeBytes();
        }
        try {
            if (image.getFileName() != null) {
                return Files.size(Paths.get(uploadDir).resolve(image.getFileName()).normalize());
            }
        } catch (Exception ignored) {
            // API metadata may be null for a legacy row whose file is no longer present.
        }
        return null;
    }

    public static class OriginalFileDownload {
        private final Path path;
        private final String originalFileName;
        private final String contentType;
        private final long sizeBytes;

        public OriginalFileDownload(Path path, String originalFileName, String contentType, long sizeBytes) {
            this.path = path;
            this.originalFileName = originalFileName;
            this.contentType = contentType;
            this.sizeBytes = sizeBytes;
        }

        public Path getPath() { return path; }
        public String getOriginalFileName() { return originalFileName; }
        public String getContentType() { return contentType; }
        public long getSizeBytes() { return sizeBytes; }
    }

    public ImageResponse getByCode(String imageCode) {
        GalleryImage img = images.findByImageCode(imageCode)
                .orElseThrow(() -> new RuntimeException("Image not found"));
        return map(img);
    }

    private String resolveThumbnailUrl(GalleryImage image) {
        String fileName = image.getFileName();
        if (fileName == null || fileName.trim().isEmpty()) {
            return image.getImageUrl();
        }

        if (!isPdf(fileName, image.getContentType())) {
            return image.getImageUrl();
        }

        try {
            String thumb = ensurePdfThumbnail(fileName);
            return "/uploads/" + thumb;
        } catch (Exception e) {
            // Keep API usable if one malformed PDF cannot be rendered.
            return null;
        }
    }

    /**
     * Creates the first-page thumbnail only when missing. This means existing
     * production PDFs are fixed automatically the first time the gallery API
     * reads them; no database migration is required.
     */
    private synchronized String ensurePdfThumbnail(String pdfFileName) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        Files.createDirectories(uploadPath);

        Path pdfPath = uploadPath.resolve(pdfFileName).normalize();
        Path normalizedUploadPath = uploadPath.toAbsolutePath().normalize();
        Path absolutePdfPath = pdfPath.toAbsolutePath().normalize();
        if (!absolutePdfPath.startsWith(normalizedUploadPath)) {
            throw new IOException("Invalid PDF path");
        }

        String thumbName = thumbnailFileName(pdfFileName);
        Path thumbPath = uploadPath.resolve(thumbName);
        if (Files.exists(thumbPath) && Files.size(thumbPath) > 0) {
            return thumbName;
        }

        if (!Files.exists(pdfPath)) {
            throw new IOException("PDF not found: " + pdfFileName);
        }

        try (PDDocument document = PDDocument.load(pdfPath.toFile())) {
            if (document.getNumberOfPages() < 1) {
                throw new IOException("PDF has no pages: " + pdfFileName);
            }

            PDFRenderer renderer = new PDFRenderer(document);
            BufferedImage page = renderer.renderImageWithDPI(0, 120, ImageType.RGB);
            if (!ImageIO.write(page, "jpg", thumbPath.toFile())) {
                throw new IOException("Could not write JPG thumbnail");
            }
        }

        return thumbName;
    }

    private String thumbnailFileName(String pdfFileName) {
        int dot = pdfFileName.lastIndexOf('.');
        String base = dot > 0 ? pdfFileName.substring(0, dot) : pdfFileName;
        return base + "_thumb.jpg";
    }

    private boolean isPdf(String fileName, String contentType) {
        if (contentType != null && "application/pdf".equalsIgnoreCase(contentType.trim())) {
            return true;
        }
        return fileName != null && fileName.toLowerCase(Locale.ENGLISH).endsWith(".pdf");
    }
}
