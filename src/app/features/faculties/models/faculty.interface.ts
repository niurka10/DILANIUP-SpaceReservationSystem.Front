//Lo que recibimos/mostramos
export interface Faculty {  
    id: string;
    name: string;
}

// Enviamos para CREAR
export interface CreateFacultyRequest {
    name: string;
}

//Enviamos para EDITAR
export interface UpdateFacultyRequest {
    name: string;
}