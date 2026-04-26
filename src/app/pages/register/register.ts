import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { ToastService } from '../../core/services/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  // Importamos RouterLink para poder navegar sin recargar la página
  imports: [ReactiveFormsModule, RouterLink], 
  templateUrl: './register.html' // (o .component.html según lo tengas)
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  private toast = inject(ToastService);

  // Agregamos el campo 'nombre' a las validaciones
  registerForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]] // Exigimos un mínimo de 6 caracteres
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, nombre } = this.registerForm.value;
      
      this.authService.registro(email!, password!, nombre!).subscribe({
        next: () => {
          this.toast.show('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
          this.router.navigate(['/login']); // Lo mandamos a loguearse
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          // Si el backend lanza la excepción "El usuario ya se encuentra registrado"
          this.toast.show('Error al registrar: El correo ya existe', 'error');
        }
      });
    } else {
      this.toast.show('Por favor, completa todos los campos correctamente', 'error');
    }
  }
}