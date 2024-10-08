import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly serverUrl: string = 'https://oneclic.app/';

  private apiUrl = 'https://api.oneclic.app/';
  private defaultHeaders = {
    Authorization: 'MTpwNDU1YXBwbDRndTE0',
    'Auth-Token': 'MTpwNDU1YXBwbDRndTE0'
  };

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  getServerUrl(): string {
    return this.serverUrl;
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

  // Detectar la velocidad de conexión del usuario
  checkConnectionSpeed(): string {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

    if (connection && connection.effectiveType) {
      const effectiveType = connection.effectiveType;
      if (effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g') {
        return 'low'; // Conexión lenta
      } else {
        return 'high'; // Conexión rápida
      }
    }
    return 'high'; // Si no se puede detectar, asumimos conexión rápida
  }

  // Generar la URL de la imagen optimizada según la conexión
  getOptimizedImageUrl(folder: string, logo: string, type: 'logo' | 'banner'): string {
    const connectionSpeed = this.checkConnectionSpeed();

    // Definir el placeholder de baja resolución según el tipo de imagen
    const placeholder = type === 'logo' ? '/assets/images/user-placeholder.webp' : '/assets/images/banner-placeholder.webp';

    // Si la conexión es lenta, usa el placeholder, si no, usa la URL real
    const imagePath = connectionSpeed === 'low'
      ? placeholder  // Placeholder de baja resolución
      : `${this.serverUrl}${folder}${logo}`; // Imagen real de alta resolución

    return imagePath;
  }

}