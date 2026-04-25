import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Buscamos el token en el bolsillo (localStorage)
  const token = localStorage.getItem('token');

  // 2. Si tenemos el token, clonamos la petición y le pegamos la cabecera
  if (token) {
    const peticionClonada = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // 3. Enviamos la petición modificada al backend
    return next(peticionClonada);
  }

  // Si no hay token (ej. cuando recién nos estamos logueando), dejamos pasar la petición normal
  return next(req);
};