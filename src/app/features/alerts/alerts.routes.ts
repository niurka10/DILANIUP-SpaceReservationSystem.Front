import { Routes } from '@angular/router';


export const ALERTS_ROUTES: Routes = [
  {
    path: '',
    data: { title: 'Alertas' },
    loadComponent: () =>
      import('../../shared/coming-soon/coming-soon.component').then(
        (m) => m.ComingSoonComponent
      ),
  },
];