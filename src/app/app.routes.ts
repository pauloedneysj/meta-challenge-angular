import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authenticatedUserGuard } from './services/guards/authenticated-user.guard';
import { unauthenticatedUserGuard } from './services/guards/unauthenticated-user.guard';
import { UsersListComponent } from './pages/home/components/users-list/users-list.component';
import { ProductsListComponent } from './pages/home/components/products-list/products-list.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [unauthenticatedUserGuard],
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [authenticatedUserGuard],
    children: [
      {
        path: '',
        component: ProductsListComponent,
        canActivate: [authenticatedUserGuard],
      },
      {
        path: 'users',
        component: UsersListComponent,
        canActivate: [authenticatedUserGuard],
      },
    ],
  },
];
