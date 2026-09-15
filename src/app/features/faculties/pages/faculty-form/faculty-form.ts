import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FacultyService } from '../../services/faculty.service';

@Component({
  selector: 'app-faculty-form',
  imports: [ReactiveFormsModule],
  templateUrl: './faculty-form.html',
  styleUrl: './faculty-form.scss',
})
export class FacultyForm implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly facultyService = inject(FacultyService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  facultyId = signal<string | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    name: ['', [Validators.required]],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.facultyId.set(id);

      this.facultyService.getById(id).subscribe({
        next: (faculty) => {
          this.form.patchValue({
            name: faculty.name,
          });
        },
        error: () => {
          this.error.set('No se pudo cargar la facultad.');
        },
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const name = this.form.value.name!.trim();

    if (this.facultyId()) {

      this.facultyService.update(this.facultyId()!, { name }).subscribe({
        next: () => {
          this.router.navigate(['/faculties']);
        },
        error: () => {
          this.error.set('No se pudo actualizar la facultad.');
          this.loading.set(false);
        },
      });

    } else {

      this.facultyService.create({ name }).subscribe({
        next: () => {
          this.router.navigate(['/faculties']);
        },
        error: () => {
          this.error.set('No se pudo crear la facultad.');
          this.loading.set(false);
        },
      });

    }
  }

  cancel(): void {
    this.router.navigate(['/faculties']);
  }
}