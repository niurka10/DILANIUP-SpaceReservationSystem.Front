import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';

export const FACULTIES_ROUTES: Routes = [
  {
    path: '',
    canActivate: [roleGuard],
    data: { roles: ['Coordinator', 'Vicerrector', 'Bienes', 'Admin'] },
    loadComponent: () =>
      import('./pages/faculty-list/faculty-list').then((m) => m.FacultyList),
  },
  {
    path: 'new',
    canActivate: [roleGuard],
    data: { roles: ['Coordinator', 'Vicerrector', 'Bienes', 'Admin'] },
    loadComponent: () =>
      import('./pages/faculty-form/faculty-form').then((m) => m.FacultyForm),
  },
  {
    path: ':id/edit',
    canActivate: [roleGuard],
    data: { roles: ['Coordinator', 'Vicerrector', 'Bienes', 'Admin'] },
    loadComponent: () =>
      import('./pages/faculty-form/faculty-form').then((m) => m.FacultyForm),
  },
];