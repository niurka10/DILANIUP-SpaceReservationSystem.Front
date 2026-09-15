import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { ShellComponent } from './layout/shell/shell.component';

// Este archivo debería cambiar muy poco: solo cuando se agrega un
// FEATURE nuevo (una carpeta nueva bajo features/). Agregar una pantalla
// dentro de un feature existente se hace en el <feature>.routes.ts
// correspondiente, no aquí. Así Dev1 y Dev2 casi nunca chocan en este
// archivo al mergear.
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  // Públicas (fuera del Shell, sin sidebar)
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  // Protegidas (dentro del Shell, con sidebar navy)
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'reservations',
        loadChildren: () =>
          import('./features/reservations/reservation.routes').then(
            (m) => m.RESERVATIONS_ROUTES
          ),
      },
      {
        path: 'faculties',
        canActivate: [roleGuard],
        data: { roles: ['Coordinator', 'Vicerrector', 'Bienes', 'Admin'] },
        loadComponent: () =>
          import('./features/faculties/pages/faculty-list/faculty-list').then(
            (m) => m.FacultyList
          ),
      },

      // Placeholders sin dueño claro aún (ver CONTEXTO-PROYECTO.md)
      {
        path: 'users',
        data: { title: 'Usuarios' },
        loadComponent: () =>
          import('./shared/coming-soon/coming-soon.component').then((m) => m.ComingSoonComponent),
      },
      {
        path: 'spaces-resources',
        data: { title: 'Espacios y Recursos' },
        loadComponent: () =>
          import('./shared/coming-soon/coming-soon.component').then((m) => m.ComingSoonComponent),
      },
      {
        path: 'alerts',
        data: { title: 'Alertas' },
        loadComponent: () =>
          import('./shared/coming-soon/coming-soon.component').then((m) => m.ComingSoonComponent),
      },
      {
        path: 'reports',
        data: { title: 'Reportes' },
        loadComponent: () =>
          import('./shared/coming-soon/coming-soon.component').then((m) => m.ComingSoonComponent),
      },
    ],
  },

  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./shared/unauthorized/unauthorized.component').then((m) => m.UnauthorizedComponent),
  },

  { path: '**', redirectTo: 'login' },
];