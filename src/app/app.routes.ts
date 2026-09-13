import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  // Públicas
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
  },

  // Protegidas (requieren sesión). El roleGuard se agrega por ruta cuando aplique.
  {
    path: 'reservations',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/reservations/reservation-list/reservation-list.component').then(
        (m) => m.ReservationListComponent
      ),
  },

  { path: 'unauthorized', loadComponent: () => import('./shared/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent) },

  { path: '**', redirectTo: 'login' },
];