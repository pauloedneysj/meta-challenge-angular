import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { inject } from '@angular/core';

export const authenticatedUserGuard: CanActivateFn = (route, state) => {
  return inject(LoginService).isAuthenticated
    ? true
    : inject(Router).createUrlTree(['/login']);
};
