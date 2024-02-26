import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { IUserResponse } from '../../../../../types/types';
import { UsersService } from '../../../../services/users.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user = {} as IUserResponse;
  isOpen = false;

  constructor(
    private loginService: LoginService,
    private userService: UsersService
  ) {
    this.getMe();
  }

  getMe() {
    this.userService.getMe().subscribe((response) => {
      this.user = response;
    });
  }

  logout() {
    this.loginService.logout();
  }
}
