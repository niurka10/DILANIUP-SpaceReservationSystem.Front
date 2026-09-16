import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceOption, SpaceOption } from '../models/reservation.interface';

// Nota: este servicio es intencionalmente mínimo — solo trae la
// lista para el combo del formulario de "Nueva Reserva". El CRUD completo
// de Spaces/Resources (crear, editar, activar/desactivar) va en tus propios
// features/spaces y features/resources, sin relación con este archivo.


@Injectable({ providedIn: 'root' })
export class OptionsService {
  constructor(private http: HttpClient) {}

  getAvailableSpaces(): Observable<SpaceOption[]> {
    return this.http.get<SpaceOption[]>('/api/space');
  }

  getAvailableResources(): Observable<ResourceOption[]> {
    return this.http.get<ResourceOption[]>('/api/resource');
  }
}