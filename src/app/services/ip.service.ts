import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private http: HttpClient) { }

  getUserIP(): Observable<any> {
    // Puedes usar cualquier API pública para obtener la IP
    return this.http.get('https://api.ipify.org/?format=json');
  }
}