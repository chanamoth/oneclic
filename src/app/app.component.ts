import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

import { register } from 'swiper/element/bundle';
register();

StatusBar.setBackgroundColor({ color: '#fff' });

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
