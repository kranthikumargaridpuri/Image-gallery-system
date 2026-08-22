import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private redirectingForExpiredSession = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isAuthRequest = req.url.indexOf('/auth/') !== -1;
    const token = this.auth.token();

    // Never attach an old JWT to login/register/password-reset requests.
    if (token && !isAuthRequest) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Backend now returns 401 when the JWT is invalid/expired.
        if (error.status === 401 && !isAuthRequest) {
          this.auth.clearSession();

          if (!this.redirectingForExpiredSession) {
            this.redirectingForExpiredSession = true;
            this.router
              .navigate(['/login'], {
                queryParams: { sessionExpired: '1' },
              })
              .finally(() => {
                this.redirectingForExpiredSession = false;
              });
          }
        }

        return throwError(error);
      })
    );
  }
}
