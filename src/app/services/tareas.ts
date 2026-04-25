import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Tarea {
  id?: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/tareas';

  getTareas() {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  crearTarea(tarea: {titulo: string, descripcion: string}) {
    // Nota: Ya no enviamos usuarioId, el backend lo saca del Token
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }
}