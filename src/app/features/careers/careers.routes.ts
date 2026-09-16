import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';

export const CAREERS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
    loadComponent: () =>
      import('./pages/career-list/career-list').then((m) => m.CareerList),
  },
  {
    path: 'new',
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
    loadComponent: () =>
      import('./pages/career-form/career-form').then((m) => m.CareerForm),
  },
  {
    path: ':id/edit',
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
    loadComponent: () =>
      import('./pages/career-form/career-form').then((m) => m.CareerForm),
  },
];