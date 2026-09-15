import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { ShellComponent } from './layout/shell/shell.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  // Públicas
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },

  // Protegidas
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'reservations',
        canActivate: [authGuard],
        loadComponent: () =>
          import(
            './features/reservations/reservation-list/reservation-list.component'
          ).then((m) => m.ReservationListComponent),
      },
      {
        path: 'faculties',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/faculties/pages/faculty-list/faculty-list')
                .then((m) => m.FacultyList),
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./features/faculties/pages/faculty-form/faculty-form')
                .then((m) => m.FacultyForm),
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import('./features/faculties/pages/faculty-form/faculty-form')
                .then((m) => m.FacultyForm),
          },
        ]
      },
      {
        path: 'users',
        data: { title: 'Usuarios' },
        loadComponent: () =>
          import('./shared/coming-soon/coming-soon.component').then(
            (m) => m.ComingSoonComponent
          ),
      },
      {
        path: 'spaces-resources',
        data: { title: 'Espacios y Recursos' },
        loadComponent: () =>
          import('./shared/coming-soon/coming-soon.component').then(
            (m) => m.ComingSoonComponent
          ),
      },
      {
        path: 'alerts',
        data: { title: 'Alertas' },
        loadComponent: () =>
          import('./shared/coming-soon/coming-soon.component').then(
            (m) => m.ComingSoonComponent
          ),
      },
      {
        path: 'reports',
        data: { title: 'Reportes' },
        loadComponent: () =>
          import('./shared/coming-soon/coming-soon.component').then(
            (m) => m.ComingSoonComponent
          ),
      },
    ],
  },

  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./shared/unauthorized/unauthorized.component').then(
        (m) => m.UnauthorizedComponent
      ),
  },

  { path: '**', redirectTo: 'login' },
];