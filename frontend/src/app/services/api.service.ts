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

  images() {
    return this.http.get<any[]>(this.api + '/images');
  }

  getImages() {
    return this.images();
  }

  getImageById(id: any) {
    return this.http.get<any>(this.api + '/images/' + id);
  }

  getImageByCode(code: any) {
    return this.http.get<any>(this.api + '/images/code/' + code);
  }

  search(keyword: any) {
    return this.http.get<any[]>(
      this.api + '/images/search?keyword=' + encodeURIComponent(keyword)
    );
  }

  searchImages(keyword: any) {
    return this.search(keyword);
  }

  byCategory(id: any) {
    return this.http.get<any[]>(this.api + '/images/category/' + id);
  }

  getImagesByCategory(id: any) {
    return this.byCategory(id);
  }

  categories() {
    return this.http.get<any[]>(this.api + '/categories');
  }

  addCategory(c: any) {
    return this.http.post(this.api + '/categories', c);
  }

  deleteCategory(id: number) {
    return this.http.delete(this.api + '/categories/' + id, {
      responseType: 'text',
    });
  }

  cart() {
    return this.http.get<any[]>(this.api + '/cart');
  }

  getCart() {
    return this.cart();
  }

  addCart(id: any) {
    return this.http.post(this.api + '/cart/' + id, {});
  }

  addToCart(id: any) {
    return this.addCart(id);
  }

  removeCart(id: any) {
    return this.http.delete(this.api + '/cart/' + id);
  }

  removeFromCart(id: any) {
    return this.removeCart(id);
  }

  upload(fd: FormData) {
    return this.http.post(this.api + '/admin/images', fd);
  }

  uploadImage(fd: FormData) {
    return this.upload(fd);
  }

  deleteImage(id: any) {
    return this.http.delete(this.api + '/admin/images/' + id);
  }

  forgotPassword(email: any) {
    return this.http.post<any>(this.api + '/auth/forgot-password', { email });
  }

  resetPassword(data: any) {
    return this.http.post<any>(this.api + '/auth/reset-password', data);
  }

  originalFileDownloadUrl(image: any): string {
    // Prefer an explicit original-file URL if the backend already returns one.
    const explicit =
      image &&
      (image.originalFileUrl ||
        image.originalUrl ||
        image.downloadUrl ||
        image.fileUrl);

    if (explicit) {
      return this.imageUrl(explicit);
    }

    // Production contract: this endpoint must return the exact bytes that
    // were originally uploaded, with Content-Type and Content-Disposition.
    if (image && image.id != null) {
      return this.api + '/images/' + encodeURIComponent(image.id) + '/download';
    }

    // Last-resort fallback for older backend responses.
    return image && image.imageUrl ? this.imageUrl(image.imageUrl) : '';
  }

  imageUrl(path: string) {
    if (!path) {
      return '';
    }

    if (path.startsWith('http')) {
      return path;
    }

    if (path.startsWith('/')) {
      return this.baseUrl ? this.baseUrl + path : path;
    }

    return this.baseUrl ? this.baseUrl + '/' + path : '/' + path;
  }
}