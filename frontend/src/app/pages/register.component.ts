import { Component } from '@angular/core'; import { Router } from '@angular/router'; import { AuthService } from '../services/auth.service';
@Component({templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']}) export class RegisterComponent{username='';email='';password='';err='';constructor(private auth:AuthService,private router:Router){} register(){this.auth.register({username:this.username,email:this.email,password:this.password}).subscribe(r=>{this.auth.save(r);this.router.navigate(['/'])},e=>this.err='Registration failed')}}
