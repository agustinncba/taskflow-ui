import { ToastService } from '../../core/services/toast';
import { ThemeService } from '../../core/services/theme';
import { ThemeToggleComponent } from '../../core/components/theme-toggle/theme-toggle';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, ThemeToggleComponent],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  private toast = inject(ToastService);
  theme = inject(ThemeService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

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