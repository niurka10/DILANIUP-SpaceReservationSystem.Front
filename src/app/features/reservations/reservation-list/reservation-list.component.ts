import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  template: `
    <div style="padding: 2rem;">
      <h1>Mis reservas (stub temporal)</h1>
      <p>Sesión activa como: {{ authService.currentUser()?.email }} ({{ authService.role() }})</p>
      <button (click)="authService.logout()">Cerrar sesión</button>
    </div>
  `,
})
export class ReservationListComponent {
  constructor(public authService: AuthService) {}
}