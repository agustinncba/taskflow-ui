import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
import { publicGuard } from './core/guards/public-guard';

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [publicGuard] // Solo usuarios SIN sesión pueden ver esto
  },
  { 
    path: 'tareas', 
    component: DashboardComponent,
    canActivate: [authGuard] // Solo usuarios CON sesión (Token) pueden entrar aquí
  },
  { 
    path: '', 
    redirectTo: '/tareas', // Por defecto, intentamos llevarlo a tareas
    pathMatch: 'full' 
  },
  {
    path: '**', // Si escribe cualquier ruta inventada (ej. /pepito)
    redirectTo: '/tareas'
  }
];