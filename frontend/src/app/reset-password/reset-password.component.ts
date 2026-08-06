import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token = '';
  newPassword = '';
  confirmPassword = '';
  message = '';
  errorMessage = '';
  loading = false;
  resetSuccessful = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    if (!this.token) {
      this.errorMessage = 'Reset link is missing or invalid. Please request a new password-reset email.';
    }
  }

  submit() {
    this.message = '';
    this.errorMessage = '';

    if (!this.token) {
      this.errorMessage = 'Reset token is missing. Please open the link sent to your email.';
      return;
    }
    if (!this.newPassword || this.newPassword.length < 8) {
      this.errorMessage = 'Password must contain at least 8 characters.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New password and confirm password do not match.';
      return;
    }

    this.loading = true;
    this.api.resetPassword({
      token: this.token,
      newPassword: this.newPassword
    }).subscribe(
      (res: any) => {
        this.loading = false;
        this.resetSuccessful = true;
        this.message = res && res.message ? res.message : 'Password reset successful.';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      (err: any) => {
        this.loading = false;
        this.errorMessage = this.getErrorMessage(err, 'Password reset failed. Please request a new reset link.');
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  private getErrorMessage(err: any, fallback: string): string {
    if (err && err.error) {
      if (typeof err.error === 'string') {
        return err.error;
      }
      if (err.error.message) {
        return err.error.message;
      }
      if (err.error.error) {
        return err.error.error;
      }
    }
    return fallback;
  }
}
