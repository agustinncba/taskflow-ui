import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tarea } from '../../../../core/models/tarea';
import { ThemeService } from '../../../../core/services/theme';

@Component({
  selector: 'app-tarea-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarea-card.html'
})
export class TareaCardComponent {
  theme = inject(ThemeService);
  @Input({ required: true }) tarea!: Tarea;
}