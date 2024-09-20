import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.oneclic.app/';
  private defaultHeaders = {
    Authorization: 'MTpwNDU1YXBwbDRndTE0',
    'Auth-Token': 'MTpwNDU1YXBwbDRndTE0'
  };

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  // Initialize storage
  async init() {
    await this.storage.create();
  }

  // Set dynamic headers from storage or fallback to defaults
  async getHeaders() {
    const auth = await this.storage.get('auth');
    const headers = auth ? { Authorization: auth, 'Auth-Token': auth } : this.defaultHeaders;
    return new HttpHeaders(headers);
  }

  // Generalized GET request
  async get(endpoint: string) {
    const headers = await this.getHeaders();
    return this.http.get(`${this.apiUrl}${endpoint}`, { headers });
  }

  // Generalized POST request
  async post(endpoint: string, body: any) {
    const headers = await this.getHeaders();
    headers.set('Content-Type', 'application/json'); // Asegúrate de que el Content-Type sea JSON
    return this.http.post(`${this.apiUrl}${endpoint}`, JSON.stringify(body), { headers });
  }
}
