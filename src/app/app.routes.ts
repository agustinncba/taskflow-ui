import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
import { publicGuard } from './core/guards/public-guard';
import { RegisterComponent } from './pages/register/register'; // Ajusta la importación

export const routes: Routes = [

  { path: 'login', component: LoginComponent, canActivate: [publicGuard] },
  { path: 'registro', component: RegisterComponent, canActivate: [publicGuard] }, // <-- NUEVA RUTA

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