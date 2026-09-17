import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateReservationRequest, Reservation } from "../models/reservation.interface";
import { Observable } from "rxjs";

const API_BASE = '/api/reservations';

@Injectable({ providedIn: 'root'})
export class ReservationService {
    constructor(private http: HttpClient) {}

    create(request: CreateReservationRequest): Observable<Reservation>{
        return this.http.post<Reservation>(API_BASE, request)
    }

    getById (id: string): Observable<Reservation>{
        return this.http.get<Reservation>(`${API_BASE}/${id}`)  
    }

    listMine(): Observable<Reservation[]>{
        return this.http.get<Reservation[]>(`${API_BASE}/mine`)
    }
}