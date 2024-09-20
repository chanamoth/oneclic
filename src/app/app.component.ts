import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

StatusBar.setBackgroundColor({ color: '#f5f5f5' });

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
