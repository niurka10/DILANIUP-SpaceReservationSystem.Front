// Lo que recibimos / mostramos
export interface Space {
  id: string;
  name: string;
  type: number;
  capacity: number;
  location: string;
  isActive: boolean;
}

// Enviamos para CREAR
export interface CreateSpaceRequest {
  name: string;
  type: number;
  capacity: number;
  location: string;
}

// Enviamos para EDITAR
export interface UpdateSpaceRequest {
  name: string;
  capacity: number;
  location: string;
}