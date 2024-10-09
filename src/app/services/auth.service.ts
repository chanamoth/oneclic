import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>(this.getUserFromLocalStorage());
  user$ = this.userSubject.asObservable();  // Observable al que los componentes pueden suscribirse

  constructor() { }

  // Almacenar el usuario en localStorage y actualizar el BehaviorSubject
  setUser(user: any) {
    localStorage.setItem('USER', JSON.stringify(user));
    this.userSubject.next(user);  // Emitir el nuevo usuario
  }

  // Obtener el usuario almacenado en localStorage
  getUser() {
    return this.userSubject.value;  // Obtener el valor actual del BehaviorSubject
  }

  // Obtener el usuario directamente desde localStorage
  private getUserFromLocalStorage() {
    const storedUser = localStorage.getItem('USER');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return !!this.getUser();  // Retorna true si hay un usuario almacenado
  }

  // Eliminar los datos del usuario en logout y emitir null
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('USER');
    this.userSubject.next(null);  // Emitir null para indicar que no hay usuario
  }
}