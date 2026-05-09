import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = 'https://image-gallery-system.onrender.com/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(data: any) {
    return this.http.post<any>(this.api + "/auth/login", data);
  }

  register(data: any) {
    return this.http.post<any>(this.api + "/auth/register", data);
  }

  save(r: any) {
    try {
      window.localStorage.setItem("token", r.token);
      window.localStorage.setItem("role", r.role);
      window.localStorage.setItem("username", r.username);
    } catch (e) {}
  }

  token() {
    try {
      return window.localStorage.getItem("token");
    } catch (e) {
      return null;
    }
  }

  loggedIn() {
    try {
      return !!window.localStorage.getItem("token");
    } catch (e) {
      return false;
    }
  }

  isAdmin() {
    try {
      return window.localStorage.getItem("role") === "ROLE_ADMIN";
    } catch (e) {
      return false;
    }
  }

  logout() {
    try {
      window.localStorage.clear();
    } catch (e) {}

    this.router.navigate(["/login"]);
  }
forgotPassword(email: string) {
  return this.http.post<any>(this.api + '/auth/forgot-password', { email });
}

resetPassword(token: string, newPassword: string) {
  return this.http.post<any>(this.api + '/auth/reset-password', {
    token,
    newPassword
  });
}

}