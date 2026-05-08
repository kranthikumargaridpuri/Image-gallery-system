import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = "";
  password = "";
  err = "";
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}
  login() {
    this.auth.login({ email: this.email, password: this.password }).subscribe(
      (r) => {
        this.auth.save(r);
        this.router.navigate(["/"]);
      },
      (e) => (this.err = "Invalid login"),
    );
  }
}
