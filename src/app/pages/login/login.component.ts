import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  handleSubmit() {
    this.loginService
      .login({
        username: this.loginForm.value.username ?? '',
        password: this.loginForm.value.password ?? '',
      })
      .subscribe();
  }
}
