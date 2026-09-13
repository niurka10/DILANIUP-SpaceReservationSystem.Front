import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { RoleCode } from '../auth/models/auth.model';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
 
  const allowedRoles = route.data?.['roles'] as RoleCode[] | undefined;
 
  // Si la ruta no define roles, solo exige estar autenticado.
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }
 
  if (authService.hasRole(...allowedRoles)) {
    return true;
  }
 
  router.navigate(['/unauthorized']);
  return false;
};