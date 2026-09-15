import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h1 class="h3 mb-1">Dashboard</h1>
    <p class="text-muted">Resumen general de tu actividad en el sistema</p>
    <div class="alert alert-secondary mt-4">
      Aquí van las tarjetas de métricas (solicitudes, reservas, espacios, etc.)
      una vez que conectemos los servicios reales de cada feature.
    </div>
  `,
})
export class DashboardComponent {}