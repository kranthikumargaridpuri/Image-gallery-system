import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  err = '';
  infoMessage = '';
  showPassword = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('sessionExpired') === '1') {
      this.infoMessage = 'Session expired. Please login again.';
    }
  }

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
