import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  api = environment.apiUrl;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // =========================================================
  // IMAGES
  // =========================================================

  images() {
    return this.http.get<any[]>(this.api + '/images');
  }

  /**
   * Admin Manage Images - server-side pagination.
   * categoryId is omitted for ALL categories.
   */
  adminImages(
    page: number,
    size: number,
    categoryId?: number | null
  ) {
    let url =
      this.api +
      '/admin/images/page?page=' +
      encodeURIComponent(page) +
      '&size=' +
      encodeURIComponent(size);

    if (categoryId != null && categoryId > 0) {
      url +=
        '&categoryId=' +
        encodeURIComponent(categoryId);
    }

    return this.http.get<any>(url);
  }

  getImages() {
    return this.images();
  }

  getImageById(id: any) {
    return this.http.get<any>(
      this.api + '/images/' + id
    );
  }

  getImageByCode(code: any) {
    return this.http.get<any>(
      this.api + '/images/code/' + code
    );
  }

  // =========================================================
  // SEARCH
  // =========================================================

  search(keyword: any) {
    return this.http.get<any[]>(
      this.api +
        '/images/search?keyword=' +
        encodeURIComponent(keyword)
    );
  }

  searchImages(keyword: any) {
    return this.search(keyword);
  }

  // =========================================================
  // CATEGORY
  // =========================================================

  byCategory(id: any) {
    return this.http.get<any[]>(
      this.api + '/images/category/' + id
    );
  }

  getImagesByCategory(id: any) {
    return this.byCategory(id);
  }

  categories() {
    return this.http.get<any[]>(
      this.api + '/categories'
    );
  }

  addCategory(c: any) {
    return this.http.post(
      this.api + '/categories',
      c
    );
  }

  deleteCategory(id: number) {
    return this.http.delete(
      this.api + '/categories/' + id
    );
  }

  // =========================================================
  // CART
  // =========================================================

  cart() {
    return this.http.get<any[]>(
      this.api + '/cart'
    );
  }

  getCart() {
    return this.cart();
  }

  addCart(id: any) {
    return this.http.post(
      this.api + '/cart/' + id,
      {}
    );
  }

  addToCart(id: any) {
    return this.addCart(id);
  }

  removeCart(id: any) {
    return this.http.delete(
      this.api + '/cart/' + id
    );
  }

  removeFromCart(id: any) {
    return this.removeCart(id);
  }

  // =========================================================
  // SINGLE IMAGE UPLOAD
  // =========================================================

  upload(fd: FormData) {
    return this.http.post(
      this.api + '/admin/images',
      fd
    );
  }

  uploadImage(fd: FormData) {
    return this.upload(fd);
  }

  // =========================================================
  // BULK IMAGE UPLOAD
  // =========================================================

  /**
   * Bulk upload multiple image files together with metadata.
   *
   * Each metadata row should contain:
   *
   * {
   *   name: string,
   *   description: string,
   *   cost: number,
   *   categoryId: number
   * }
   *
   * IMPORTANT:
   * files[] and rows[] must correspond to each other.
   */
  bulkUploadImages(
    files: File[],
    rows: any[]
  ) {

    const form = new FormData();

    // Add all selected image files.
    files.forEach((file: File) => {
      form.append(
        'files',
        file,
        file.name
      );
    });

    // Prepare metadata.
    const metadata = rows.map((r: any) => {

      return {
        name:
          r.name != null
            ? String(r.name).trim()
            : '',

        description:
          r.description != null
            ? String(r.description).trim()
            : '',

        cost:
          r.cost != null &&
          r.cost !== ''
            ? Number(r.cost)
            : 0,

        categoryId:
          r.categoryId != null &&
          r.categoryId !== ''
            ? Number(r.categoryId)
            : null
      };

    });

    form.append(
      'metadata',
      JSON.stringify(metadata)
    );

    // IMPORTANT:
    // Use this.api because /admin/images/bulk
    // is a backend API endpoint.
    //
    // Do NOT use this.base.
    return this.http.post<any>(
      this.api + '/admin/images/bulk',
      form
    );
  }

  // =========================================================
  // DELETE IMAGE
  // =========================================================

  deleteImage(id: any) {
    return this.http.delete(
      this.api + '/admin/images/' + id
    );
  }

  // =========================================================
  // PASSWORD
  // =========================================================

  forgotPassword(email: any) {
    return this.http.post<any>(
      this.api + '/auth/forgot-password',
      {
        email: email
      }
    );
  }

  resetPassword(data: any) {
    return this.http.post<any>(
      this.api + '/auth/reset-password',
      data
    );
  }

  // =========================================================
  // ORIGINAL FILE DOWNLOAD
  // =========================================================

  originalFileDownloadUrl(
    image: any
  ): string {

    // Prefer explicit original file URL
    // returned by backend.
    const explicit =
      image &&
      (
        image.originalFileUrl ||
        image.originalUrl ||
        image.downloadUrl ||
        image.fileUrl
      );

    if (explicit) {
      return this.imageUrl(explicit);
    }

    /**
     * Production endpoint:
     *
     * GET /api/images/{id}/download
     *
     * Backend should return original uploaded
     * bytes with Content-Type and
     * Content-Disposition.
     */
    if (
      image &&
      image.id != null
    ) {

      return (
        this.api +
        '/images/' +
        encodeURIComponent(image.id) +
        '/download'
      );
    }

    // Fallback for older backend responses.
    return image && image.imageUrl
      ? this.imageUrl(image.imageUrl)
      : '';
  }

  // =========================================================
  // IMAGE URL BUILDER
  // =========================================================

  imageUrl(path: string) {

    if (!path) {
      return '';
    }

    // Already complete URL.
    if (path.startsWith('http')) {
      return path;
    }

    // Example:
    // /uploads/image.jpg
    if (path.startsWith('/')) {

      return this.baseUrl
        ? this.baseUrl + path
        : path;
    }

    // Example:
    // uploads/image.jpg
    return this.baseUrl
      ? this.baseUrl + '/' + path
      : '/' + path;
  }
  bulkUploadZip(file: File, defaultCost: number, defaultCategoryId: number) {
    const form = new FormData();
    form.append('file', file, file.name);
    form.append('defaultCost', String(defaultCost));
    form.append('defaultCategoryId', String(defaultCategoryId));
    return this.http.post(this.api + '/admin/images/bulk/zip', form);
  }

}