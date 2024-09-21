import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-oficial-stores',
  templateUrl: './oficial-stores.page.html',
  styleUrls: ['./oficial-stores.page.scss'],
})

export class OficialStoresPage implements OnInit {

  scrolled: boolean = false;
  loadedComercios: any[] = []; // Comercios cargados
  banners: any[] = []; // Almacena las imágenes del banner
  comercios: any[] = []; // Todos los comercios disponibles
  itemsPerPage = 10; // Cantidad por página
  currentPage = 0; // Página actual
  loadingMore = false; // Estado de carga
  isLoading: boolean = true;
  serverUrl: string;

  constructor(private apiService: ApiService) {
    this.serverUrl = this.apiService.getServerUrl();
  }

  ngOnInit() {
    this.loadInitialData();
  }

  // Método para manejar el evento de scroll
  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    this.scrolled = scrollTop > 50;
  }

  // Método para cargar los datos iniciales
  loadInitialData() {
    this.apiService.post('search/get_rubros_app', {
      pais: 'PE',
      get_country_ip: 0,
      get_comercios_index: 1,
      from: 0
    }).then(response => {
      response.subscribe((data: any) => {
        if (data && data.results && data.results.comercios) {
          this.comercios = data.results.comercios.comercios || [];
          this.banners = data.banners || [];
          this.loadMore(); // Cargar los primeros 10 comercios
          this.isLoading = false;
        }
      });
    });
  }

  // Método para cargar más comercios
  loadMore(event?: any) {
    if (this.loadingMore) return; // Evitar solicitudes múltiples
    this.loadingMore = true;

    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const newItems = this.comercios.slice(start, end);

    this.loadedComercios = [...this.loadedComercios, ...newItems];
    this.currentPage++;

    if (event) {
      event.target.complete();
    }

    this.loadingMore = false;
    if (newItems.length < this.itemsPerPage && event) {
      event.target.disabled = true;
    }
  }

  // Método para refrescar los datos al usar el refresher
  refreshData() {
    this.isLoading = true;
    this.currentPage = 0; // Reiniciar la página actual
    this.loadedComercios = []; // Vaciar los comercios cargados
    this.loadInitialData(); // Volver a cargar los datos
    setTimeout(() => {
      this.isLoading = false;
    }, 1500); // Simular un tiempo de carga
  }
}
