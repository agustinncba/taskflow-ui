import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea, DatosCrearTarea } from '../core/models/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/tareas';

  // Ahora el método devuelve un Observable de un array de Tareas
  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  // Especificamos que enviamos DatosCrearTarea y recibimos la Tarea creada
  crearTarea(tarea: DatosCrearTarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }
}