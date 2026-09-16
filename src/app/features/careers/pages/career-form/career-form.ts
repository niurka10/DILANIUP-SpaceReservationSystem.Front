import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerService } from '../../services/career.service';
import { FacultyService } from '../../../faculties/services/faculty.service';
import { Faculty } from '../../../faculties/models/faculty.interface';

@Component({
  selector: 'app-career-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './career-form.html',
  styleUrl: './career-form.scss'
})
export class CareerForm implements OnInit {
  private fb = inject(FormBuilder);
  private careerService = inject(CareerService);
  private facultyService = inject(FacultyService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  careerId = signal<string | null>(null);
  faculties = signal<Faculty[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    name: ['', Validators.required],
    facultyId: ['', Validators.required]
  });

  ngOnInit(): void {
    // Carga las facultades para el dropdown
    this.facultyService.getAll().subscribe({
      next: (data) => this.faculties.set(data),
      error: () => this.error.set('No se pudieron cargar las facultades.')
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.careerId.set(id);
      this.careerService.getById(id).subscribe({
        next: (career) => this.form.patchValue({
          name: career.name,
          facultyId: career.facultyId
        }),
        error: () => this.error.set('No se pudo cargar la carrera.')
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { name, facultyId } = this.form.value;

    if (this.careerId()) {
      // Update solo envía name (según tu UpdateCareerRequest, que no incluye facultyId)
      this.careerService.update(this.careerId()!, { name: name! }).subscribe({
        next: () => this.router.navigate(['/careers']),
        error: () => {
          this.error.set('No se pudo actualizar la carrera.');
          this.loading.set(false);
        }
      });
    } else {
      this.careerService.create({ name: name!, facultyId: facultyId! }).subscribe({
        next: () => this.router.navigate(['/careers']),
        error: () => {
          this.error.set('No se pudo crear la carrera.');
          this.loading.set(false);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/careers']);
  }
}