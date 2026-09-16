import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CareerService } from '../../services/career.service';
import { Career } from '../../models/career.interface';

@Component({
  selector: 'app-career-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './career-list.html',
  styleUrl: './career-list.scss'
})
export class CareerList implements OnInit {
  private careerService = inject(CareerService);

  careers = signal<Career[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.careerService.getAll().subscribe({
      next: (data) => {
        this.careers.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las carreras.');
        this.loading.set(false);
      }
    });
  }
}