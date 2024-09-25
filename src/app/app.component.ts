import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { register } from 'swiper/element/bundle';
import { IpService } from './services/ip.service'; // Servicio para obtener la IP
import { GeolocationService } from './services/geolocation.service'; // Servicio para obtener la geolocalización
import { UserLocationService } from './services/user-location.service'; // Servicio compartido para almacenar IP y país

StatusBar.setStyle({ style: Style.Light });
StatusBar.setBackgroundColor({ color: '#f4f5f8' });

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private ipService: IpService,
    private geoService: GeolocationService,
    private userLocationService: UserLocationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    // Ocultar el splash screen de Capacitor después de que la app esté lista
    SplashScreen.hide();

    // Remover el splash screen personalizado
    setTimeout(() => {
      const splash = document.querySelector('.custom-splash-screen');
      if (splash) {
        splash.classList.add('hidden');
      }
    }, 3000);

    // Obtener la IP y el país del usuario
    this.getLocation();
  }

  // Método para obtener la IP y el país
  getLocation() {
    this.ipService.getUserIP().subscribe(data => {
      const userIp = data.ip;
      this.geoService.getCountryFromIP(userIp).subscribe(
        response => {
          const country = response['geoplugin_countryName'] || response['country'];
          console.log('Country:', country);

          // Guardar la IP y el país en el servicio compartido
          this.userLocationService.setUserLocation(userIp, country);
        },
        error => {
          if (error.status === 0) {
            //console.log('Por favor, desactiva tu AdBlocker para obtener la geolocalización.');
          } else {
            console.error('Error fetching geolocation data:', error);
          }
        }
      );
    },
      error => {
        console.error('Error fetching IP address:', error);
      });
  }
}