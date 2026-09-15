import { Routes } from '@angular/router';

export const RESERVATIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./reservation-list/reservation-list.component').then(
        (m) => m.ReservationListComponent
      ),
  },
];