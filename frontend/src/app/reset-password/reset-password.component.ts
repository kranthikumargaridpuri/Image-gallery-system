import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {

  token = '';
  newPassword = '';
  message = '';

  constructor(private api: ApiService) {}

  submit() {
    this.message = '';

    this.api.resetPassword(this.token, this.newPassword).subscribe(
      res => {
        this.message = res.message;
      },
      err => {
        this.message = err.error.message || 'Reset failed';
      }
    );
  }
}