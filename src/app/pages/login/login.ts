import { ToastService } from '../../core/services/toast';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { Auth } from '../../services/auth'; // <-- Ajusta esta ruta si tu auth.ts está en otra carpeta

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink], // Habilitamos los formularios modernos
  templateUrl: './login.html'
})
export class LoginComponent {
  // Inyectamos las herramientas que necesitamos
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  private toast = inject(ToastService);

  // Creamos la estructura del formulario con sus validaciones
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  // Método que se ejecuta al darle clic a "Ingresar"
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email!, password!).subscribe({
        next: (response) => {
          console.log('Login exitoso, Token guardado:', response.jwtToken);
          this.toast.show('¡Bienvenido de nuevo!');
          this.router.navigate(['/tareas']);
        },
        error: (err) => {
          console.error('Error al iniciar sesión', err);
          this.toast.show('Credenciales incorrectas', 'error');
        }
      });
    }
  }
}