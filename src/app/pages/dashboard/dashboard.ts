import { ToastService } from '../../core/services/toast';
import { ThemeService } from '../../core/services/theme';
import { ThemeToggleComponent } from '../../core/components/theme-toggle/theme-toggle';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareasService } from '../../services/tareas';
import { TareaCardComponent } from './components/tarea-card/tarea-card';
import { Router } from '@angular/router';
import { Tarea } from '../../core/models/tarea';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TareaCardComponent, ThemeToggleComponent],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  private tareasService = inject(TareasService);
  private router = inject(Router);
  private toast = inject(ToastService);
  theme = inject(ThemeService);

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