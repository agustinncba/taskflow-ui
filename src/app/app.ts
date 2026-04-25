import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// 1. Importamos nuestro nuevo componente Toast
import { ToastComponent } from './core/components/toast/toast'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Le decimos a Angular que vamos a usar RouterOutlet Y ToastComponent en el HTML
  imports: [RouterOutlet, ToastComponent], 
  templateUrl: './app.html',
  styleUrl: './app.css' // (o styleUrl vacío, dependiendo de cómo lo tengas)
})
export class App {
  title = 'taskflow-ui';
}