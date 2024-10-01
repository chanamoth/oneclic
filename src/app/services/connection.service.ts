import { Injectable } from '@angular/core';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private isOnline = new BehaviorSubject<boolean>(true);

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private platform: Platform
  ) {
    this.initializeNetworkEvents();
  }

  private initializeNetworkEvents() {
    if (this.platform.is('cordova')) {
      // Uso de Network en dispositivos móviles
      this.checkNetworkStatusCordova();
    } else {
      // Uso de la API del navegador
      this.checkNetworkStatusWeb();
    }
  }

  private checkNetworkStatusCordova() {
    // Verificar el estado inicial de la red
    this.isOnline.next(navigator.onLine);

    window.addEventListener('offline', () => {
      this.isOnline.next(false);
      this.presentOfflineAlert();
    });

    window.addEventListener('online', () => {
      this.isOnline.next(true);
      this.presentOnlineToast();
    });
  }

  private checkNetworkStatusWeb() {
    // Verificar el estado inicial de la red
    this.isOnline.next(navigator.onLine);

    window.addEventListener('offline', () => {
      this.isOnline.next(false);
      this.presentOfflineAlert();
    });

    window.addEventListener('online', () => {
      this.isOnline.next(true);
      this.presentOnlineToast();
    });
  }

  async presentOfflineAlert() {
    const toast = await this.toastController.create({
      message: 'Se ha perdido la conexión a internet',
      duration: 2000,
      color: 'dark'
    });
    toast.present();
  }

  async presentOnlineToast() {
    const toast = await this.toastController.create({
      message: 'Se ha restablecido la conexión a internet',
      duration: 2000,
      color: 'dark'
    });
    toast.present();
  }

  getNetworkStatus() {
    return this.isOnline.asObservable();
  }
}