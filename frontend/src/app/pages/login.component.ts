import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  err = '';
  showPassword = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.err = '';

    this.auth.login({ email: this.email, password: this.password }).subscribe(
      (r) => {
        this.auth.save(r);
        this.router.navigate(['/']);
      },
      () => {
        this.err = 'Invalid login';
      }
    );
  }
}
