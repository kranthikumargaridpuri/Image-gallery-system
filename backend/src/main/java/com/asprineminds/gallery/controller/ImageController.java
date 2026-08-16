package com.asprineminds.gallery.controller;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.asprineminds.gallery.dto.Dtos.ApiResponse;
import com.asprineminds.gallery.dto.Dtos.ImageResponse;
import com.asprineminds.gallery.service.ImageService;
import com.asprineminds.gallery.service.ImageService.OriginalFileDownload;

@RestController
public class ImageController {

    private final ImageService service;

    public ImageController(ImageService s) {
        this.service = s;
    }

    @GetMapping("/api/images")
    public List<ImageResponse> all() {
        return service.all();
    }

    @GetMapping("/api/images/code/{code}")
    public ImageResponse getByCode(@PathVariable String code) {
        return service.getByCode(code);
    }

    @GetMapping("/api/images/search")
    public List<ImageResponse> search(@RequestParam String keyword) {
        return service.search(keyword);
    }

    @GetMapping("/api/images/category/{id}")
    public List<ImageResponse> byCat(@PathVariable Long id) {
        return service.byCat(id);
    }

    /**
     * Download the exact original uploaded file.
     *
     * Preserves:
     * - original file name
     * - original extension
     * - original MIME/content type
     * - original file size
     * - original file bytes
     */
    @GetMapping("/api/images/{id}/download")
    public ResponseEntity<Resource> downloadOriginal(@PathVariable Long id) throws Exception {

        OriginalFileDownload download = service.getOriginalFile(id);

        Resource resource = new UrlResource(download.getPath().toUri());

        if (!resource.exists() || !resource.isReadable()) {
            return ResponseEntity.notFound().build();
        }

        /*
         * Never blindly trust a bad/empty MIME value.
         *
         * Example:
         * PDF  -> application/pdf
         * JPG  -> image/jpeg
         * PNG  -> image/png
         *
         * Unknown files fall back to application/octet-stream,
         * NOT text/plain.
         */
        MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;

        String contentType = download.getContentType();

        if (contentType != null && !contentType.trim().isEmpty()) {
            try {
                mediaType = MediaType.parseMediaType(contentType.trim());
            } catch (Exception ignored) {
                mediaType = MediaType.APPLICATION_OCTET_STREAM;
            }
        }

        /*
         * Preserve the exact original upload filename.
         *
         * Example:
         * Form.pdf
         * photo.jpg
         * banner.png
         */
        String originalFileName = download.getOriginalFileName();

        if (originalFileName == null || originalFileName.trim().isEmpty()) {
            originalFileName = "download";
        }

        ContentDisposition disposition = ContentDisposition
                .attachment()
                .filename(
                        originalFileName,
                        StandardCharsets.UTF_8
                )
                .build();

        return ResponseEntity
                .ok()
                .contentType(mediaType)
                .contentLength(download.getSizeBytes())
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        disposition.toString()
                )
                .header(
                	    "X-Content-Type-Options",
                	    "nosniff"
                	)
                .header(
                        HttpHeaders.CACHE_CONTROL,
                        "no-cache, no-store, must-revalidate"
                )
                .header(
                        HttpHeaders.PRAGMA,
                        "no-cache"
                )
                .body(resource);
    }

    @PostMapping("/api/admin/images")
    @PreAuthorize("hasRole('ADMIN')")
    public ImageResponse upload(
            @RequestParam String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Double cost,
            @RequestParam Long categoryId,
            @RequestParam MultipartFile file
    ) throws Exception {

        return service.upload(
                name,
                description,
                cost,
                categoryId,
                file
        );
    }

    @DeleteMapping("/api/admin/images/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse del(@PathVariable Long id) {

        service.delete(id);

        return new ApiResponse("Deleted");
    }

    /**
     * Existing inline preview/static-file endpoint.
     *
     * This endpoint is intentionally NOT attachment/download.
     * It allows images and PDFs to continue previewing normally
     * in the gallery.
     */
    @GetMapping("/uploads/{file:.+}")
    public ResponseEntity<Resource> file(
            @PathVariable String file
    ) throws Exception {

        Path uploadRoot = Paths
                .get("uploads")
                .toAbsolutePath()
                .normalize();

        Path path = uploadRoot
                .resolve(file)
                .normalize();

        /*
         * Security:
         * prevent paths such as ../../etc/passwd
         */
        if (!path.startsWith(uploadRoot)) {
            return ResponseEntity
                    .badRequest()
                    .build();
        }

        if (!Files.exists(path) || !Files.isRegularFile(path)) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        String contentType = null;

        try {
            contentType = Files.probeContentType(path);
        } catch (Exception ignored) {
            // Fallback below.
        }

        if (contentType == null || contentType.trim().isEmpty()) {

            String lowerName = file.toLowerCase();

            if (lowerName.endsWith(".pdf")) {
                contentType = "application/pdf";

            } else if (
                    lowerName.endsWith(".jpg")
                            || lowerName.endsWith(".jpeg")
            ) {
                contentType = "image/jpeg";

            } else if (lowerName.endsWith(".png")) {
                contentType = "image/png";

            } else if (lowerName.endsWith(".gif")) {
                contentType = "image/gif";

            } else if (lowerName.endsWith(".webp")) {
                contentType = "image/webp";

            } else if (lowerName.endsWith(".svg")) {
                contentType = "image/svg+xml";

            } else {
                contentType = "application/octet-stream";
            }
        }

        MediaType mediaType;

        try {
            mediaType = MediaType.parseMediaType(contentType);
        } catch (Exception e) {
            mediaType = MediaType.APPLICATION_OCTET_STREAM;
        }

        return ResponseEntity
                .ok()
                .contentType(mediaType)
                .header(
                	    "X-Content-Type-Options",
                	    "nosniff"
                	)
                .body(resource);
    }
}