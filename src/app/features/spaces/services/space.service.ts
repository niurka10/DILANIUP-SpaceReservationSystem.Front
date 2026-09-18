import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Space,
  CreateSpaceRequest,
  UpdateSpaceRequest
} from '../models/space.interface';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {

  private http = inject(HttpClient);
  private apiUrl = '/api/Space';

  getAll(): Observable<Space[]> {
    return this.http.get<Space[]>(this.apiUrl);
  }

  getById(id: string): Observable<Space> {
    return this.http.get<Space>(`${this.apiUrl}/${id}`);
  }

  create(request: CreateSpaceRequest): Observable<Space> {
    return this.http.post<Space>(this.apiUrl, request);
  }

  update(id: string, request: UpdateSpaceRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, request);
  }

  activate(id: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/${id}/activate`,
      {}
    );
  }

  deactivate(id: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/${id}/deactivate`,
      {}
    );
  }
}