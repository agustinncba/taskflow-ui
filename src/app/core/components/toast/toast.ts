import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms cubic-bezier(0.23, 1, 0.32, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(20%)', opacity: 0 }))
      ])
    ])
  ],
  template: `
    <div *ngIf="toastService.currentToast() as toast" 
         @toastAnimation
         class="fixed bottom-6 right-6 z-[100] flex flex-col min-w-[320px] max-w-md overflow-hidden bg-white dark:bg-zinc-900 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-zinc-200 dark:border-zinc-800 transition-all duration-300">
      
      <div class="flex items-center gap-4 px-5 py-4">
        <!-- Iconos optimizados -->
        <div class="flex-shrink-0">
          <div *ngIf="toast.type === 'success'" class="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-full text-emerald-600 dark:text-emerald-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div *ngIf="toast.type === 'error'" class="p-2 bg-rose-100 dark:bg-rose-500/20 rounded-full text-rose-600 dark:text-rose-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
        </div>

        <!-- Contenido -->
        <div class="flex-grow py-0.5">
          <p class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
            {{ toast.type === 'success' ? 'Completado' : 'Hubo un error' }}
          </p>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2">
            {{ toast.text }}
          </p>
        </div>

        <!-- Botón cerrar -->
        <button (click)="toastService.clear()" 
                class="flex-shrink-0 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Barra de progreso -->
      <div class="h-1 w-full bg-zinc-100 dark:bg-zinc-800">
        <div class="h-full transition-all duration-[3500ms] ease-linear"
             [ngClass]="{
               'bg-emerald-500': toast.type === 'success',
               'bg-rose-500': toast.type === 'error'
             }"
             [style.width.%]="progress">
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ToastComponent {
  public toastService = inject(ToastService);
  progress = 100;

  constructor() {
    // Lógica para animar la barra de progreso cuando aparece un toast
    let interval: any;
    
    // Efecto reactivo simple
    const originalShow = this.toastService.show.bind(this.toastService);
    
    // Usamos un setter o vigilamos el signal para reiniciar la barra
    // En Angular 21/Signals podemos usar effect()
    import('@angular/core').then(m => {
      m.effect(() => {
        const toast = this.toastService.currentToast();
        if (toast) {
          this.progress = 100;
          // Un pequeño timeout para que empiece la animación después de renderizar
          setTimeout(() => {
            this.progress = 0;
          }, 50);
        }
      });
    });
  }
}
