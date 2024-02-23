import { Component } from '@angular/core';
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
  roles = { ADMIN: 'Administrador', USER: 'Usuário' };

  constructor(
    private loginService: LoginService,
    private userService: UsersService
  ) {
    this.getUser();
  }

  logout() {
    this.loginService.logout();
  }

  getUser() {
    this.userService.getMe().subscribe((response) => {
      this.user = response;
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }
}
