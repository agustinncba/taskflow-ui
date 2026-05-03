import { Injectable, signal } from '@angular/core';

// Definimos cómo se ve nuestro mensaje
export interface ToastMessage {
  text: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // Un Signal es como una variable reactiva. Inicialmente es null (no hay mensaje)
  currentToast = signal<ToastMessage | null>(null);

  show(text: string, type: 'success' | 'error' = 'success') {
    this.currentToast.set({ text, type });

    // Hacemos que desaparezca automáticamente después de 3.5 segundos (un poco más para que la barra se vea)
    setTimeout(() => {
      this.clear();
    }, 3500);
  }

  clear() {
    this.currentToast.set(null);
  }
}