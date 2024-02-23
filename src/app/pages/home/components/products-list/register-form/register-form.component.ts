import { Component } from '@angular/core';
import { ProductsService } from '../../../../../services/products.service';
import { IProductData, IUserResponse } from '../../../../../../types/types';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  user = JSON.parse(localStorage.getItem('user') || '{}') as IUserResponse;

  productForm = new FormGroup({
    userId: new FormControl(this.user.id),
    code: new FormControl(''),
    name: new FormControl(''),
  });

  constructor(private productsService: ProductsService) {}

  submitForm() {
    if (this.productForm.valid) {
      this.productsService
        .createProduct(this.productForm.value as IProductData)
        .subscribe(() => window.location.reload());
    }
  }
}
