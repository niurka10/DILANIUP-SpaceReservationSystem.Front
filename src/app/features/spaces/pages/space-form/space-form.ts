import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { SpaceService } from '../../services/space.service';

@Component({
  selector: 'app-space-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './space-form.html',
  styleUrl: './space-form.scss'
})
export class SpaceFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private spaceService = inject(SpaceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEdit = false;
  spaceId = '';
  loading = signal(false);
  error = '';

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    type: [1, [Validators.required]],
    capacity: [1, [Validators.required, Validators.min(1)]],
    location: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.spaceId = this.route.snapshot.paramMap.get('id') ?? '';
    this.isEdit = !!this.spaceId;

    if (this.isEdit) {
      this.loadSpace();
    }
  }

  loadSpace(): void {
    this.loading.set(true);

    this.spaceService.getById(this.spaceId).subscribe({
      next: (space) => {
        this.form.patchValue({
          name: space.name,
          type: space.type,
          capacity: space.capacity,
          location: space.location
        });

        this.loading.set(false);
      },

      error: () => {
        this.error = 'No se pudo cargar el espacio.';
        this.loading.set(false);
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error = '';

    const value = this.form.getRawValue();

    if (this.isEdit) {

      const request = {
        name: value.name,
        capacity: value.capacity,
        location: value.location
      };

      this.spaceService.update(this.spaceId, request).subscribe({
        next: () => {
          this.router.navigate(['/spaces']);
        },
        error: () => {
          this.error = 'No se pudo actualizar el espacio.';
          this.loading.set(false);
        }
      });

    } else {

      const request = {
        name: value.name,
        type: value.type,
        capacity: value.capacity,
        location: value.location
      };

      this.spaceService.create(request).subscribe({
        next: () => {
          this.router.navigate(['/spaces']);
        },
        error: () => {
          this.error = 'No se pudo crear el espacio.';
          this.loading.set(false);
        }
      });
    }
  }
}