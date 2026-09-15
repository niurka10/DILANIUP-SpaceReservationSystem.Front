import { Routes } from '@angular/router';

export const RESOURCES_ROUTES: Routes = [
  {
    path: '',
    data: { title: 'Recursos' },
    loadComponent: () =>
      import('../../shared/coming-soon/coming-soon.component').then(
        (m) => m.ComingSoonComponent
      ),
  },
];