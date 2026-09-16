import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Career, CreateCareerRequest, UpdateCareerRequest } from '../models/career.interface';

@Injectable({
  providedIn: 'root',
})
export class CareerService {
  private http = inject(HttpClient);
  private baseUrl = 'api/Career';

  getAll(): Observable<Career[]> {
    return this.http.get<Career[]>(this.baseUrl);
  }

  getById(id: string): Observable<Career> {
    return this.http.get<Career>(`${this.baseUrl}/${id}`);
  }
  
  create(request: CreateCareerRequest): Observable<Career> {
    return this.http.post<Career>(this.baseUrl, request);
  }

  update(id: string, request: UpdateCareerRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, request);
  }
}
