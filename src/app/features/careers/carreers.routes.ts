import { Routes } from '@angular/router';


export const CAREERS_ROUTES: Routes = [
  {
    path: '',
    data: { title: 'Carreras' },
    loadComponent: () =>
      import('../../shared/coming-soon/coming-soon.component').then(
        (m) => m.ComingSoonComponent
      ),
  },
];