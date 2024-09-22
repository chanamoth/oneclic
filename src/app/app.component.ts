import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

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

    SplashScreen.hide();

    this.setupStatusBar();

    setTimeout(() => {
      const splash = document.querySelector('.custom-splash-screen');
      if (splash) {
        splash.classList.add('hidden');
      }
    }, 3000);
  }

  async setupStatusBar() {

    await StatusBar.setOverlaysWebView({ overlay: true });
    await StatusBar.setStyle({ style: Style.Light });
  }

}