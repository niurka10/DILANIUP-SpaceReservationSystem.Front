import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FacultyService } from '../../services/faculty.service';
import { Faculty } from '../../models/faculty.interface';

@Component({
  selector: 'app-faculty-list',
  imports: [RouterLink],
  templateUrl: './faculty-list.html',
  styleUrl: './faculty-list.scss',
})
export class FacultyList implements OnInit {

  private facultyService = inject(FacultyService);

  faculties = signal<Faculty[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.facultyService.getAll().subscribe({
      next: (data) => {
        this.faculties.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('No se pudieron cargar las facultades.');
        this.loading.set(false);
      }
    });
  }
}