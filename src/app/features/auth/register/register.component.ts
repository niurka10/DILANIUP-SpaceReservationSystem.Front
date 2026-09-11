import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { RegisterRoleCode } from '../../../core/auth/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly roleOptions = [
    { label: 'Estudiante', value: RegisterRoleCode.Student },
    { label: 'Docente', value: RegisterRoleCode.Teacher },
  ];

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', [Validators.required]],
    requestedRole: [RegisterRoleCode.Student, [Validators.required]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const raw = this.form.getRawValue();

    this.authService
      .register({
        name: raw.name!,
        email: raw.email!,
        password: raw.password!,
        phone: raw.phone!,
        requestedRole: raw.requestedRole!,
      })
      .subscribe({
        next: () => this.router.navigate(['/reservations']),
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(
            err?.error?.description ?? 'No se pudo completar el registro. Intenta de nuevo.'
          );
        },
        complete: () => this.isLoading.set(false),
      });
  }
}