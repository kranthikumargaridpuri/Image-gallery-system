import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email = '';
  message = '';
  errorMessage = '';
  loading = false;

  constructor(private api: ApiService) {}

  submit() {
    this.message = '';
    this.errorMessage = '';

    const email = this.email.trim();
    if (!email) {
      this.errorMessage = 'Email is required.';
      return;
    }

    this.loading = true;
    this.api.forgotPassword(email).subscribe(
      (res: any) => {
        this.loading = false;
        this.message = res && res.message
          ? res.message
          : 'If the email is registered, a password reset link has been sent.';
      },
      (err: any) => {
        this.loading = false;
        this.errorMessage = this.getErrorMessage(err, 'Unable to send reset email. Please try again.');
      }
    );
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
