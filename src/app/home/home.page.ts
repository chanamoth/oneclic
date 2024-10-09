import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UserLocationService } from '../services/user-location.service';
import { IonContent, MenuController, ModalController } from '@ionic/angular';
import { ConnectionService } from '../services/connection.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonContent, { static: false }) content!: IonContent;

  comercios: any[] = [];
  categorias: any[] = [];
  listado: any[] = [];
  isLoading: boolean = false;
  banners: any[] = [];
  serverUrl: string;
  productosVistos: any[] = [];
  /* Skeleton */
  arrayLive = new Array(10);
  arraArrivals = new Array(4);
  /* */
  isOnline: boolean = true;
  USER: any = null;
  private userSubscription!: Subscription;

  constructor(private menu: MenuController,
      public apiService: ApiService,
      private userLocationService: UserLocationService,
      private modalController: ModalController,
      private connectionService: ConnectionService,
      private cd: ChangeDetectorRef,
      private router: Router,
      private authService: AuthService) {
    this.serverUrl = this.apiService.getServerUrl();
  }

  // Método para cerrar el menú
  closeMenu() {
    this.menu.close(); // Cierra el menú activo
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.USER = user;
      this.cd.detectChanges();  // Forzar la actualización de la vista
    });
    this.isOnline = false;
    this.checkNetworkStatus();
    this.loadTiendasData();
    this.loadCategoriasData();
    this.loadBannerData();
    this.loadProductosData();
    this.productosVistos = this.getProductosVistos();
  }

  //
  checkNetworkStatus() {
    this.connectionService.getNetworkStatus().subscribe((status: boolean) => {
      this.isOnline = status;
      this.isLoading = false;
      // Forzar actualización del estado si no se refleja automáticamente
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    // Desuscribirse del observable para evitar fugas de memoria
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  handleClick() {
    this.logout();
    this.closeMenu();
  }

  logout() {
    this.authService.logout();
  }

  // Cargar datos de tiendas
  loadTiendasData() {
    this.isLoading = true;

    // Obtener el país del usuario
    const country = this.userLocationService.getUserCountry();

    this.apiService.post('search/getLastShopsIndex', { pais: country }).then(response => {
      response.subscribe((data: any) => {
        if (data?.results?.tiendas) {
          // Mapear los comercios y añadir el campo logoLoaded inicializado en false
          this.comercios = data.results.tiendas.map((comercio: any) => {
            return { ...comercio, logoLoaded: false };
          });
        }
        this.isLoading = false;
      }, () => {
        this.isLoading = false; // Manejar el error
      });
    });
  }

  // Cargar datos de categorías
  loadCategoriasData() {
    this.isLoading = true;

    this.apiService.post('search/get_categorias_app', {}).then(response => {
      response.subscribe((data: any) => {
        if (data?.results?.categorias) {
          //this.categorias = data.results.categorias;
          this.categorias = data.results.categorias.map((categoria: any) => {
            return { ...categoria, imgLoaded: false };
          });
        }
        this.isLoading = false;
      }, () => {
        this.isLoading = false; // Manejar el error
      });
    });
  }

  // Cargar datos de banners
  loadBannerData() {
    this.isLoading = true;

    // Obtener el país del usuario
    const country = this.userLocationService.getUserCountry();
    const paisIp = country ? 0 : 1;

    this.apiService.post('search/get_rubros_app', {
      pais: country,
      get_country_ip: paisIp,
      get_comercios_index: 1,
      from: 0
    }).then(response => {
      response.subscribe((data: any) => {
        if (data?.banners) {
          // Mapear los banners y añadir el campo bannerLoaded inicializado en false
          this.banners = data.banners.map((banner: any) => {
            return { ...banner, bannerLoaded: false };
          });
          this.isLoading = false;
        }
      });
    });
  }

  // Cargar datos de productos
  loadProductosData() {
    this.isLoading = true;

    // Obtener el país del usuario
    const country = this.userLocationService.getUserCountry();

    this.apiService.post('search/fullsearch', { pais: country, from: 0, rows: 10 }).then(response => {
      response.subscribe((data: any) => {
        if (data?.results?.listado) {
          // Añadir la propiedad productoLoaded para gestionar el estado de carga
          this.listado = data.results.listado.map((producto: any) => {
            return { ...producto, productoLoaded: false };
          });

          // Ordenar los productos por idarticulo en orden descendente
          this.listado = this.listado.sort((a: any, b: any) => b.idarticulo - a.idarticulo);
        }
        this.isLoading = false;
      }, () => {
        this.isLoading = false; // Manejar el error
      });
    });
  }

  // 10 ultimos productos recien vistos
  getProductosVistos() {
    const key = 'productos_vistos';
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  closeModal() {
    this.modalController.dismiss(); // Cierra el modal
  }

  // Refrescar los datos de la página
  refreshData(event: any) {
    if (this.isOnline) {
      this.isLoading = true;
      this.ngOnInit();
      setTimeout(() => {
        this.isLoading = false;
        event.target.complete(); // Completar el refresher
      }, 1500); // Simular un tiempo de carga
    } else {
      event.target.complete(); // Completar el refresher incluso si no hay conexión
    }
  }

  goToStoreProfile(id: string) {
    this.router.navigate(['/store-profile', id]);
  }

}