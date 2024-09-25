import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {
  private userIp: string = ''; // Inicializar vacío
  private userCountry: string = ''; // Inicializar vacío

  constructor() { }

  // Método para establecer la IP y el país
  setUserLocation(ip: string, country: string) {
    this.userIp = ip;
    this.userCountry = country;
  }

  // Obtener la IP
  getUserIp(): string {
    return this.userIp || 'Unknown'; // Si no está disponible, devolver 'Unknown'
  }

  // Obtener el país
  getUserCountry(): string {
    return this.userCountry || 'PE'; // Si no está disponible, devolver 'PE'
  }

}