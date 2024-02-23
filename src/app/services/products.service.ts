import { Injectable } from '@angular/core';
import { IProductData, IProductResponse } from '../../types/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = 'http://localhost:8093';

  constructor(private httpClient: HttpClient, private router: Router) {}

  createProduct(data: IProductData): Observable<IProductResponse> {
    return this.httpClient.post<IProductResponse>(
      this.url + `/products`,
      data,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`
        ),
      }
    );
  }

  getProducts(): Observable<IProductResponse[]> {
    return this.httpClient.get<IProductResponse[]>(this.url + '/products', {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      ),
    });
  }

  getProductsByUser(userId: string): Observable<IProductResponse[]> {
    return this.httpClient.get<IProductResponse[]>(
      this.url + `/products/${userId}`,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`
        ),
      }
    );
  }

  updateProduct(
    productId: string,
    data: IProductData
  ): Observable<IProductResponse> {
    return this.httpClient.put<IProductResponse>(
      this.url + `/products/${productId}`,
      data,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`
        ),
      }
    );
  }

  deleteProduct(productId: string): Observable<any> {
    return this.httpClient.delete(this.url + `/products/${productId}`, {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      ),
    });
  }
}
