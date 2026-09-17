import { Component, inject, OnInit, signal } from "@angular/core";
import { CreateReservationRequest, Reservation, ResourceOption, SPACE_TYPE_LABELS, SpaceOption } from "../models/reservation.interface";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { OptionsService } from "../services/options.service";
import { ReservationService } from "../services/reservation.service";
import { Route, Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";

interface ResourceRow {
  option: ResourceOption;
  selected: boolean;
  quantity: number;
}

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss',
})
export class ReservationForm implements OnInit {

  private readonly fb = inject(FormBuilder);

  readonly spaceTypeLabels = SPACE_TYPE_LABELS

  readonly spaces = signal<SpaceOption[]>([]);
  readonly resourceRows = signal<ResourceRow[]>([]);
  readonly isLoadingOptions = signal(false);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.group({
    spaceId: [''],
    date: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    reason: ['', [Validators.required, Validators.minLength(10)]],
  })

  hasSelectionError(): boolean {
    const hasSpace = !!this.form.controls.spaceId.value;
    const hasResources = this.resourceRows().some((r) => r.selected);
    return !hasSpace && !hasResources;
  }

  constructor(
    // private fb: FormBuilder,
    private optionsService: OptionsService,
    private reservationsService: ReservationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoadingOptions.set(true);
    
    this.optionsService.getAvailableSpaces().subscribe({
      next: (spaces) => this.spaces.set(spaces),
      error: () => this.errorMessage.set('No se pudieron cargar los espacios disponibles.'),
    });

    this.optionsService.getAvailableResources().subscribe({
      next: (resources) => {
        this.resourceRows.set(
          resources.map((option) => ({ option, selected: false, quantity: 1 }))
        );
        this.isLoadingOptions.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudieron cargar los recursos disponibles.');
        this.isLoadingOptions.set(false);
      },
    });
  }

  toggleResource(row: ResourceRow): void {
    this.resourceRows.update((rows) =>
      rows.map((r) => (r === row ? { ...r, selected: !r.selected } : r))
    );
  }

  updateQuantity(row: ResourceRow, value: string): void {
    const quantity = Math.max(1, parseInt(value, 10) || 1);
    this.resourceRows.update((rows) =>
      rows.map((r) => (r === row ? { ...r, quantity } : r))
    );
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.hasSelectionError()) {
      this.errorMessage.set('Selecciona un espacio, al menos un recurso, o ambos.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const raw = this.form.getRawValue();

    const request: CreateReservationRequest = {
      // El backend espera DateTime; se manda como fecha ISO a medianoche,
      // la hora real va en startTime/endTime por separado.
      date: `${raw.date}T00:00:00`,
      startTime: `${raw.startTime}:00`,
      endTime: `${raw.endTime}:00`,
      reason: raw.reason!,
      spaceId: raw.spaceId || null,
      resources: this.resourceRows()
        .filter((r) => r.selected)
        .map((r) => ({ resourceId: r.option.id, quantity: r.quantity })),
    };

    this.reservationsService.create(request).subscribe({
      next: () => this.router.navigate(['/reservations']),
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(
          err?.error?.description ?? 'No se pudo crear la reserva. Verifica los datos.'
        );
      },
    });
  }
}