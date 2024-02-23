import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { IUserResponse, IUserUpdateData } from '../../../../../types/types';
import { UsersService } from '../../../../services/users.service';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginService } from '../../../../services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, RegisterFormComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  users: any[] = [];

  userById: IUserUpdateData = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    role: '',
  };

  me = JSON.parse(localStorage.getItem('user') || '{}') as IUserResponse;
  userId: string = '';
  isOpen: boolean = false;
  isEdit: boolean = false;

  constructor(
    private usersService: UsersService,
    private loginService: LoginService
  ) {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  getUserById() {
    this.usersService.getUserById(this.userId).subscribe((response) => {
      this.userById.firstName = response.firstName;
      this.userById.lastName = response.lastName;
      this.userById.username = response.username;
      this.userById.role = response.role;
    });
  }

  updateUser() {
    this.usersService.updateUser(this.userId, this.userById).subscribe(() => {
      if (this.userId === this.me.id) this.loginService.logout();

      this.getUsers();
      this.userId = '';
      this.isEdit = false;
    });
  }

  deleteUser() {
    if (this.userId === this.me.id) {
      this.usersService.deleteUser(this.userId).subscribe(() => {
        this.loginService.logout();
      });
    } else {
      this.usersService.deleteUser(this.userId).subscribe(() => {
        this.getUsers();
        this.userId = '';
        this.isOpen = false;
      });
    }
  }
}
