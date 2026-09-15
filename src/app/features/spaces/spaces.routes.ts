import { Routes } from '@angular/router';

export const SPACES_ROUTES: Routes = [
  {
    path: '',
    data: { title: 'Espacios' },
    loadComponent: () =>
      import('../../shared/coming-soon/coming-soon.component').then(
        (m) => m.ComingSoonComponent
      ),
  },
];