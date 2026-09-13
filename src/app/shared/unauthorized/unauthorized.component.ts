import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  template: `<div style="padding: 2rem;"><h1>403 - No autorizado</h1></div>`,
})
export class UnauthorizedComponent {}