import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast'; // Ajusta la ruta si es necesario

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastService);

  // Dejamos que la petición siga su curso (.pipe) y nos quedamos esperando la respuesta
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      
      // Si el servidor nos devuelve un 401 (No Autorizado) o 403 (Prohibido)
      if (error.status === 401 || error.status === 403) {
        console.warn('Token expirado o inválido. Cerrando sesión...');
        
        // 1. Limpiamos la basura (el token viejo)
        localStorage.removeItem('token');
        
        // 2. Avisamos al usuario con estilo
        toast.show('Tu sesión expiró. Ingresa de nuevo.', 'error');
        
        // 3. Lo pateamos al login
        router.navigate(['/login']);
      } 
      // Bonus: Si el backend en Java está apagado (Error 0)
      else if (error.status === 0) {
        toast.show('No hay conexión con el servidor', 'error');
      }

      // Dejamos que el error siga su camino por si algún componente quiere hacer algo más
      return throwError(() => error);
    })
  );
};