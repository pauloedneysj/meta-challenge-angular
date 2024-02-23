import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILoginData, ILoginResponse } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:8093';

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(user: ILoginData): Observable<ILoginResponse> {
    return this.httpClient
      .post<ILoginResponse>(this.url + '/auth/login', user)
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['']);
        })
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get isAuthenticated(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
