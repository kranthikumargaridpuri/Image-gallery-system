import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ApiService {
private api = 'https://image-gallery-system.onrender.com/api';


  constructor(private http: HttpClient) {}

  categories() {
    return this.http.get<any[]>(this.api + "/categories");
  }

  images() {
    return this.http.get<any[]>(this.api + "/images");
  }

  getImageByCode(code: any) {
    return this.http.get<any>(this.api + "/images/code/" + code);
  }

  search(k: any) {
    return this.http.get<any[]>(this.api + "/images/search?keyword=" + k);
  }

  byCategory(id: any) {
    return this.http.get<any[]>(this.api + "/images/category/" + id);
  }

  cart() {
    return this.http.get<any[]>(this.api + "/cart");
  }

  addCart(id: any) {
    return this.http.post(this.api + "/cart/" + id, {});
  }

  removeCart(id: any) {
    return this.http.delete(this.api + "/cart/" + id);
  }

  addCategory(c: any) {
    return this.http.post(this.api + "/categories", c);
  }

  upload(fd: any) {
    return this.http.post(this.api + "/admin/images", fd);
  }

  deleteImage(id: any) {
    return this.http.delete(this.api + "/admin/images/" + id);
  }

  forgotPassword(email: string) {
    return this.http.post<any>(
      this.api + "/auth/forgot-password",
      { email }
    );
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post<any>(
      this.api + "/auth/reset-password",
      {
        token,
        newPassword
      }
    );
  }

  imageUrl(path: any) {
    return path && path.startsWith("/uploads")
      ? "http://localhost:8080" + path
      : path;
  }
}