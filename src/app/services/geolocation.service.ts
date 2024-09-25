import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private http: HttpClient) { }

  getCountryFromIP(ip: string): Observable<any> {
    const apiUrl = `https://ipapi.co/${ip}/json/`;
    return this.http.get(apiUrl);
  }
}
