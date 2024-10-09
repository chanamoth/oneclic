import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Importa AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // Si el usuario está logueado, redirigir a la página de inicio o dashboard
      this.router.navigate(['/home']);  // Cambia la ruta por la que prefieras
      return false;  // No permitir el acceso a la ruta de login/registro
    }
    return true;  // Permitir el acceso si no está logueado
  }
}