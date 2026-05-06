import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({ providedIn: "root" })
export class ApiService {
  api = "http://localhost:8080/api";
  constructor(private http: HttpClient) {}
  categories() {
    return this.http.get<any[]>(this.api + "/categories");
  }
  images() {
    return this.http.get<any[]>(this.api + "/images");
  }
  search(k) {
    return this.http.get<any[]>(this.api + "/images/search?keyword=" + k);
  }
  byCategory(id) {
    return this.http.get<any[]>(this.api + "/images/category/" + id);
  }
  cart() {
    return this.http.get<any[]>(this.api + "/cart");
  }
  addCart(id) {
    return this.http.post(this.api + "/cart/" + id, {});
  }
  removeCart(id) {
    return this.http.delete(this.api + "/cart/" + id);
  }
  addCategory(c) {
    return this.http.post(this.api + "/categories", c);
  }
  upload(fd) {
    return this.http.post(this.api + "/admin/images", fd);
  }
  deleteImage(id) {
    return this.http.delete(this.api + "/admin/images/" + id);
  }
  imageUrl(path) {
    return path && path.startsWith("/uploads")
      ? "http://localhost:8080" + path
      : path;
  }
}
