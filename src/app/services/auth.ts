import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/login'; // Tu endpoint de Spring

  login(email: string, password: string) {
    return this.http.post<{ jwtToken: string }>(this.apiUrl, { email, password })
      .pipe(
        tap(res => {
          // Guardamos el "pase VIP" en el navegador
          localStorage.setItem('token', res.jwtToken);
        })
      );
  }

  registro(email: string, password: string, nombre: string) {
    const urlRegistro = 'http://localhost:8080/usuarios';
    // Enviamos el objeto exactamente como lo espera tu Record 'DatosCrearUsuario' en Java
    return this.http.post(urlRegistro, { email, password, nombre });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
