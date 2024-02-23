import { Component } from '@angular/core';
import { UsersService } from '../../../../../services/users.service';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IUserData } from '../../../../../../types/types';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
  });

  constructor(private usersService: UsersService) {}

  submitForm() {
    if (this.userForm.valid) {
      this.usersService
        .createUser(this.userForm.value as IUserData)
        .subscribe(() => window.location.reload());
    }
  }
}
