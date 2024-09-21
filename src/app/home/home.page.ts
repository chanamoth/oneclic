import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private menu: MenuController) { }

  // Método para cerrar el menú
  closeMenu() {
    this.menu.close(); // Cerrar el menú activo
  }

  ngOnInit() {
  }

}