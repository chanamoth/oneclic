import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { UserLocationService } from '../services/user-location.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonContent, { static: false }) content!: IonContent;

  comercios: any[] = [];
  categorias: any[] = [];
  isLoading: boolean = true;
  banners: any[] = [];
  serverUrl: string;

  constructor(private menu: MenuController, public apiService: ApiService, private userLocationService: UserLocationService) {
    this.serverUrl = this.apiService.getServerUrl();
  }

  // Método para cerrar el menú
  closeMenu() {
    this.menu.close(); // Cerrar el menú activo
  }

  ngOnInit() {
    this.loadTiendasData();
    this.loadCategoriasData();
    this.loadBannerData();
  }

  // Cargamos las tiendas
  loadTiendasData() {

    this.isLoading = true;

    // Obtenemos el pais
    const country = this.userLocationService.getUserCountry();

    this.apiService.post('search/getLastShopsIndex', { pais: country, }).then(response => {
      response.subscribe((data: any) => {
        if (data && data.results && data.results.tiendas) {
          this.comercios = data.results.tiendas
          this.isLoading = false;
        }
      });
    });
  }

  // Cargamos las categorias
  loadCategoriasData() {

    this.isLoading = true;

    this.apiService.post('search/get_categorias_app', { }).then(response => {
      response.subscribe((data: any) => {
        if (data && data.results && data.results.categorias) {
          this.categorias = data.results.categorias;
          this.isLoading = false;
        }
      });
    });

  }

  // Cargamos los banners
  loadBannerData() {

    this.isLoading = true;

    // Obtenemos el pais
    const country = this.userLocationService.getUserCountry();
    let paisIp: number;

    if (!country) {
      paisIp = 1;
    } else {
      paisIp = 0;
    }

    this.apiService.post('search/get_rubros_app', {
      pais: country,
      get_country_ip: paisIp,
      get_comercios_index: 1,
      from: 0
    }).then(response => {
      response.subscribe((data: any) => {
        if (data && data.banners) {
          this.banners = data.banners || [];
          this.isLoading = false;
        }
      });
    });

  }

  // Refrescar los datos de la página
  refreshData(event: any) {
    this.isLoading = true;
    this.ngOnInit();
    setTimeout(() => {
      this.isLoading = false;
      event.target.complete(); // Completar el refresher
    }, 1500); // Simular un tiempo de carga
  }

}