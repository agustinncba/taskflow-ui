/**
 * Modelo que representa una Tarea en el sistema.
 * Refleja fielmente la entidad Tarea de nuestro Backend.
 */
export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
}

/**
 * DTO para la creación de tareas.
 * Se usa para tipar el formulario de creación.
 */
export interface DatosCrearTarea {
  titulo: string;
  descripcion: string;
}