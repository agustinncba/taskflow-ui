import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../services/auth';

/**
 * PUBLIC GUARD: Guardián de rutas públicas.
 * Protege rutas como el /login o /registro.
 */
export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  // Si YA está logueado y quiere entrar al Login...
  if (authService.isLoggedIn()) {
    // Lo redirigimos a su panel de control
    router.navigate(['/tareas']);
    return false; // Bloqueamos que vea el componente de login
  }

  // Si NO está logueado, está perfecto, le dejamos ver el formulario de login
  return true; 
};