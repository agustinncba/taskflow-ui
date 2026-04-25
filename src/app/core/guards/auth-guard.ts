import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../services/auth'; // Asegúrate de que la ruta coincida con tu servicio

/**
 * AUTH GUARD: Guardián de rutas privadas.
 * Se ejecuta ANTES de que el usuario pueda entrar a una ruta protegida (como /tareas).
 */
export const authGuard: CanActivateFn = (route, state) => {
  // 1. Inyectamos los servicios necesarios (sin usar constructores, al estilo Angular moderno)
  const authService = inject(Auth);
  const router = inject(Router);

  // 2. Verificamos si el usuario tiene el Token (nuestra "pulsera VIP")
  if (authService.isLoggedIn()) {
    return true; // ¡Adelante! Le permitimos ver la pantalla.
  }

  // 3. Si no está logueado, lo pateamos de vuelta al login
  console.warn('Acceso denegado: Redirigiendo al login...');
  router.navigate(['/login']);
  return false; // Bloqueamos la navegación a la ruta solicitada.
};