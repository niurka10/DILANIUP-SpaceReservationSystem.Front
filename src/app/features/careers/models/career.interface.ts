// Lo que recibimos / mostramos
export interface Career {
  id: string;
  name: string;
  facultyId: string;
}

// Enviamos para CREAR
export interface CreateCareerRequest {
  name: string;
  facultyId: string;
}

// Enviamos para EDITAR
export interface UpdateCareerRequest {
  name: string;
}