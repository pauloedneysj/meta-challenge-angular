import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserData, IUserResponse, IUserUpdateData } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = 'http://localhost:8093';

  constructor(private httpClient: HttpClient, private router: Router) {}

  createUser(data: IUserData): Observable<IUserResponse> {
    return this.httpClient.post<IUserResponse>(
      this.url + `/auth/register`,
      data,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`
        ),
      }
    );
  }

  getMe(): Observable<IUserResponse> {
    return this.httpClient.get<IUserResponse>(this.url + '/auth/me', {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      ),
    });
  }
  getUsers(): Observable<any> {
    return this.httpClient.get<any>(this.url + '/users', {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      ),
    });
  }

  getUserById(userId: string): Observable<IUserResponse> {
    return this.httpClient.get<IUserResponse>(this.url + `/users/${userId}`, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      ),
    });
  }

  updateUser(userId: string, data: IUserUpdateData): Observable<IUserResponse> {
    return this.httpClient.put<IUserResponse>(
      this.url + `/users/${userId}`,
      data,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`
        ),
      }
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this.httpClient.delete(this.url + `/users/${userId}`, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      ),
    });
  }
}
