import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { UserLocationService } from '../services/user-location.service';

@Component({
  selector: 'app-oficial-stores',
  templateUrl: './oficial-stores.page.html',
  styleUrls: ['./oficial-stores.page.scss'],
})

export class OficialStoresPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content!: IonContent;

  ionViewWillEnter() {
    this.scrollToTop();
  }

  scrollToTop() {
    if (this.content) {
      this.content.scrollToTop(1); // Ajusta la velocidad de scroll
    }
  }

  scrolled: boolean = false;
  comercios: any[] = []; // Todos los comercios disponibles (almacenados en memoria)
  loadedComercios: any[] = []; // Comercios que se muestran progresivamente en la vista
  banners: any[] = []; // Almacena las imágenes del banner
  itemsPerPage = 10; // Comercios por página
  currentPage = 1; // Página actual para el scroll infinito
  loadingMore = false; // Estado para evitar múltiples solicitudes
  isLoading: boolean = true; // Estado de carga inicial
  serverUrl: string;
  showAlert: boolean = false; // Control de la alerta de "sin resultados"
  searchTerm: string = ''; // Guarda el término de búsqueda actual
  noMoreData = false; // Control para saber si ya no hay más datos para cargar
  filteredComercios: any[] = []; // Comercios filtrados por búsqueda

  constructor(public apiService: ApiService, private userLocationService: UserLocationService) {
    this.serverUrl = this.apiService.getServerUrl();
  }

  ngOnInit() {
    this.loadInitialData();
  }

  // Controla el scroll para mostrar o no la cabecera
  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    this.scrolled = scrollTop > 50;
  }

  // Cargar los datos iniciales de los comercios (solo una vez)
  loadInitialData() {

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
        if (data && data.results && data.results.comercios) {
          // Almacenar todos los comercios que devuelve la API en 'comercios'
          this.comercios = data.results.comercios.comercios.map((comercio: any) => {
            return { ...comercio, logoLoaded: false };
          });

          // Resetear la lista cargada y cargar los primeros datos
          this.resetComercios();
          this.banners = data.banners || [];
          this.isLoading = false;
        }
      });
    });
  }

  // Resetear la lista de comercios cargados (para uso al filtrar o reiniciar)
  resetComercios() {
    this.currentPage = 1; // Reiniciar la página actual
    this.loadedComercios = []; // Reiniciar los comercios cargados
    this.noMoreData = false; // Habilitar la carga de más datos

    // Cargar el primer bloque de datos según el término de búsqueda
    this.applyFilter();
  }

  // Aplicar el filtro o cargar la lista completa progresivamente
  applyFilter() {
    let filteredComercios = this.comercios;

    // Si hay un término de búsqueda, aplicar el filtro
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      filteredComercios = this.getFilteredComercios();
    }

    // Mostrar los primeros 10 comercios de la lista filtrada o completa
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const newItems = filteredComercios.slice(start, end);

    // Añadir los nuevos comercios al bloque actual de loadedComercios
    this.loadedComercios = [...this.loadedComercios, ...newItems];
    this.showAlert = this.loadedComercios.length === 0; // Mostrar alerta si no hay resultados

    // Si no se encontraron más elementos, marcar como no hay más datos
    if (newItems.length < this.itemsPerPage) {
      this.noMoreData = true;
    }

    this.currentPage++; // Incrementar la página para la siguiente carga
  }

  // Obtener los comercios filtrados por el término de búsqueda
  getFilteredComercios() {
    return this.comercios.filter((comercio: any) => {
      return comercio.nombre.toLowerCase().includes(this.searchTerm);
    });
  }

  // Método para cargar más comercios, ya sea filtrados o no
  loadMore(event?: any) {
    if (this.loadingMore || this.isLoading || this.noMoreData) {
      if (event) event.target.complete();
      return; // Evitar múltiples solicitudes
    }

    this.loadingMore = true;

    // Cargar más datos filtrados o completos según el estado actual
    this.applyFilter();

    this.loadingMore = false;

    if (event) {
      event.target.complete();
    }
  }

  // Manejar el input de búsqueda
  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase(); // Guardar el término de búsqueda
    this.resetComercios(); // Reiniciar la lista con el nuevo término de búsqueda
  }

  // Refrescar los datos de la página
  refreshData(event: any) {
    this.isLoading = true;
    this.currentPage = 1; // Reiniciar la página actual
    this.noMoreData = false; // Habilitar la carga de más datos
    this.loadedComercios = []; // Reiniciar los comercios cargados

    this.loadInitialData(); // Volver a cargar los datos

    setTimeout(() => {
      this.isLoading = false;
      event.target.complete(); // Completar el refresher
    }, 1500); // Simular un tiempo de carga
  }
}