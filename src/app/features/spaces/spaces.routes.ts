import { Routes } from '@angular/router';
import { SpaceListComponent } from './pages/space-list/space-list';
import { Title } from '@angular/platform-browser';
import { SpaceFormComponent } from './pages/space-form/space-form';

export const SPACES_ROUTES: Routes = [
  {
    path: '',
    data: { title: 'Espacios' },
    component: SpaceListComponent,
  },
  {
    path: 'new',
    data: {title: 'Nuevo Espacio'},
    component: SpaceFormComponent,
  },
  {
    path: ':id/edit',
    data: {title: 'Editar espacio'},
    component: SpaceFormComponent
  }
];