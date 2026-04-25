import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
template: `
    <div *ngIf="toastService.currentToast() as toast" 
         class="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border transition-all duration-300"
         [ngClass]="{
           'bg-emerald-500/90 border-emerald-400 text-white backdrop-blur-md': toast.type === 'success',
           'bg-rose-600/90 border-rose-500 text-white backdrop-blur-md': toast.type === 'error'
         }">
      
      <svg *ngIf="toast.type === 'error'" class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
      </svg>

      <svg *ngIf="toast.type === 'success'" class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>

      <span class="font-medium tracking-wide text-sm">{{ toast.text }}</span>
    </div>
  `
})
export class ToastComponent {
  // Hacemos el servicio público para poder leerlo desde el HTML
  public toastService = inject(ToastService);
}