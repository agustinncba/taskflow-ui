import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './services/auth-interceptor'; // El que pega el Token
import { errorInterceptor } from './core/interceptors/error-interceptor'; // <-- 1. Importa el nuevo

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // 2. Agrega el errorInterceptor a la lista
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])) 
  ]
};