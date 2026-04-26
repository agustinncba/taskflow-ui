import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tarea } from '../../../../core/models/tarea';

@Component({
  selector: 'app-tarea-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarea-card.html'
})
export class TareaCardComponent {
  // El decorador @Input permite que el dashboard le envíe la tarea
  // El "!" indica que confiamos en que el valor llegará
  @Input({ required: true }) tarea!: Tarea;
}