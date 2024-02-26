import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { IProductResponse, IUserResponse } from '../../../../../types/types';
import { ProductsService } from '../../../../services/products.service';
import { formatDate } from '../../../../../utils/functions/format-date';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [NgFor, RegisterFormComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  products: IProductResponse[] = [];
  productById: IProductResponse = {} as IProductResponse;
  productId: string = '';

  user = {} as IUserResponse;

  isOpen = false;
  isEdit = false;
  formatDate = formatDate;

  constructor(
    private productService: ProductsService,
    private usersService: UsersService
  ) {
    this.usersService.getMe().subscribe((response) => {
      this.user = response;
      this.getProducts();
    });
  }

  getProducts() {
    if (this.user.role === 'ADMIN') {
      this.productService.getProducts().subscribe((response) => {
        this.products = response.reverse();
      });
    } else if (this.user.role === 'USER') {
      this.productService
        .getProductsByUser(this.user.id)
        .subscribe((response) => {
          this.products = response.reverse();
        });
    }
  }

  createProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response;
    });
  }

  getProductById() {
    this.productById = this.products.find(
      (product) => product.id === this.productId
    ) as IProductResponse;
  }

  updateProduct() {
    this.productService
      .updateProduct(this.productId, this.productById)
      .subscribe(() => {
        this.getProducts();
        this.productId = '';
        this.isEdit = false;
      });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productId).subscribe(() => {
      this.getProducts();
      this.productId = '';
      this.isOpen = false;
    });
  }
}
