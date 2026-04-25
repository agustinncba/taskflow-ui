import { ToastService } from '../../core/services/toast';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareasService, Tarea } from '../../services/tareas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  private tareasService = inject(TareasService);
  private router = inject(Router);
  private toast = inject(ToastService);

  tareas: Tarea[] = [];
  nuevaTarea = { titulo: '', descripcion: '' };

  ngOnInit() {
    this.cargarTareas();
  }

  cargarTareas() {
    this.tareasService.getTareas().subscribe(data => this.tareas = data);
  }

agregarTarea() {
    if (this.nuevaTarea.titulo.trim()) {
      this.tareasService.crearTarea(this.nuevaTarea).subscribe({
        next: () => {
          this.nuevaTarea = { titulo: '', descripcion: '' };
          this.cargarTareas(); // Recarga la lista
          this.toast.show('Tarea creada con éxito');
        },
        error: (err) => {
          console.error('Error del servidor:', err);
          this.toast.show('Error al crear la tarea', 'error');
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}