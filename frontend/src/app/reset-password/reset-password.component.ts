import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  token = '';
  password = '';

  message = '';

  constructor(private api: ApiService) {}

  reset() {

    this.api.resetPassword({
      token: this.token,
      password: this.password
    }).subscribe(

      (res: any) => {

        this.message = 'Password reset successful';

        alert('Password reset successful');
      },

      (err: any) => {

        console.log(err);

        alert('Reset failed');
      }
    );
  }
}