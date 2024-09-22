import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

StatusBar.setStyle({ style: Style.Light });
StatusBar.setBackgroundColor({ color: '#f4f5f8' });

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    // Ocultar el splash screen de Capacitor después de que la app esté lista
    SplashScreen.hide();

    // Remover el splash screen personalizado
    setTimeout(() => {
      const splash = document.querySelector('.custom-splash-screen');
      if (splash) {
        splash.classList.add('hidden'); // Agregar una clase para ocultarlo con animación
      }
    }, 3000); // Tiempo en milisegundos antes de ocultar el splash personalizado
  }
}
