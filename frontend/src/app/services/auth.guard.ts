import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.loggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const allowedRoles = route.data.roles as string[] | undefined;

    if (allowedRoles && allowedRoles.length > 0) {
      const userRole = this.auth.role();

      if (!allowedRoles.includes(userRole || '')) {
        alert('Access denied. Admin only.');
        this.router.navigate(['']);
        return false;
      }
    }

    return true;
  }
}