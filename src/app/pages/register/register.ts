import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { ToastService } from '../../core/services/toast';
import { ThemeService } from '../../core/services/theme';
import { ThemeToggleComponent } from '../../core/components/theme-toggle/theme-toggle';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, ThemeToggleComponent],
  templateUrl: './register.html'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  private toast = inject(ToastService);
  theme = inject(ThemeService);

  registerForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, nombre } = this.registerForm.value;
      
      this.authService.registro(email!, password!, nombre!).subscribe({
        next: () => {
          this.toast.show('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          this.toast.show('Error al registrar: El correo ya existe', 'error');
        }
      });
    } else {
      this.toast.show('Por favor, completa todos los campos correctamente', 'error');
    }
  }
}