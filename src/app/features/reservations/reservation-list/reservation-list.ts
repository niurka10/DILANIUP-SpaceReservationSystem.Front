import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reservation, RESERVATION_STATUS_LABELS } from '../models/reservation.interface';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.scss',
})
export class ReservationListComponent implements OnInit {
  readonly statusLabels = RESERVATION_STATUS_LABELS;
  readonly reservations = signal<Reservation[]>([]);
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  constructor(private reservationsService: ReservationService) {}

  ngOnInit(): void {
    this.reservationsService.listMine().subscribe({
      next: (reservations) => {
        this.reservations.set(reservations);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudieron cargar tus reservas.');
        this.isLoading.set(false);
      },
    });
  }
}