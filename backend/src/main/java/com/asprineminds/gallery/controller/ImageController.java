package com.asprineminds.gallery.controller;

import com.asprineminds.gallery.dto.Dtos.*;
import com.asprineminds.gallery.service.ImageService;
import com.asprineminds.gallery.service.ImageService.OriginalFileDownload;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
public class ImageController {

    private final ImageService service;

    public ImageController(ImageService s) {
        service = s;
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
     * Downloads the exact bytes stored for the uploaded file.
     * The browser receives the original upload name, MIME type and size.
     */
    @GetMapping("/api/images/{id}/download")
    public ResponseEntity<Resource> downloadOriginal(@PathVariable Long id) throws Exception {
        OriginalFileDownload download = service.getOriginalFile(id);
        Resource resource = new UrlResource(download.getPath().toUri());

        ContentDisposition disposition = ContentDisposition.attachment()
                .filename(download.getOriginalFileName(), StandardCharsets.UTF_8)
                .build();

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(download.getContentType()))
                .contentLength(download.getSizeBytes())
                .header(HttpHeaders.CONTENT_DISPOSITION, disposition.toString())
                .header("X-Content-Type-Options", "nosniff")
                .body(resource);
    }

    @PostMapping("/api/admin/images")
    @PreAuthorize("hasRole('ADMIN')")
    public ImageResponse upload(
            @RequestParam String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Double cost,
            @RequestParam Long categoryId,
            @RequestParam MultipartFile file) throws Exception {

        return service.upload(name, description, cost, categoryId, file);
    }

    @DeleteMapping("/api/admin/images/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse del(@PathVariable Long id) {
        service.delete(id);
        return new ApiResponse("Deleted");
    }

    /**
     * Existing preview/static-file endpoint. It remains inline so current
     * image/PDF preview behavior is not changed by the download feature.
     */
    @GetMapping("/uploads/{file:.+}")
    public ResponseEntity<Resource> file(@PathVariable String file) throws Exception {
        Path uploadRoot = Paths.get("uploads").toAbsolutePath().normalize();
        Path path = uploadRoot.resolve(file).normalize();

        if (!path.startsWith(uploadRoot)) {
            return ResponseEntity.badRequest().build();
        }

        Resource resource = new UrlResource(path.toUri());
        String contentType = Files.probeContentType(path);

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
}
