import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {

  email = '';
  message = '';
  errorMessage = '';
  token = '';

  constructor(private api: ApiService) {}

  submit() {
    this.message = '';
    this.errorMessage = '';
    this.token = '';

    if (!this.email || this.email.trim() === '') {
      this.errorMessage = 'Email is required';
      return;
    }

    this.api.forgotPassword(this.email).subscribe(
      res => {
        this.message = res.message;
        this.token = res.token;
        this.email = '';
      },
      err => {
        this.errorMessage = err.error.message || 'Email not found';
      }
    );
  }
}