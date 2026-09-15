import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Placeholder genérico para features que aún no se construyen
// (Usuarios, Espacios y Recursos, Alertas, Reportes). El título
// viene de route.data['title'] para no crear un componente por cada una.
@Component({
  selector: 'app-coming-soon',
  standalone: true,
  template: `
    <h1 class="h3 mb-1">{{ title }}</h1>
    <p class="text-muted">Esta sección todavía no está construida.</p>
  `,
})
export class ComingSoonComponent {
  private route = inject(ActivatedRoute);
  title = this.route.snapshot.data['title'] ?? 'Próximamente';
}