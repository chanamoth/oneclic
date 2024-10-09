import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-store-profile',
  templateUrl: './store-profile.page.html',
  styleUrls: ['./store-profile.page.scss'],
})
export class StoreProfilePage implements OnInit {
  comercio: any;
  productos: any[] = [];
  allProductos: any[] = [];
  serverUrl: string;
  selectedImage: any = null;
  selectedTab: string = 'about';
  scrolled: boolean = false;
  currentPage: number = 0;
  pageSize: number = 10;
  isFixed: boolean = false;
  isLoading: boolean = true;
  isModalOpen: boolean = false;

  // Nuevas propiedades para la vista y ordenación
  viewMode: string = 'grid'; // Para alternar entre grid y lista
  sortBy: string = 'relevance'; // Para seleccionar el criterio de orden
  description: SafeResourceUrl = '';
  miniWeb: SafeResourceUrl = '';

  @ViewChild('iframe', { static: false }) iframe!: ElementRef;

  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private sanitizer: DomSanitizer
  ) {
    this.serverUrl = this.apiService.getServerUrl();
  }

  ngOnInit() {
    const comercioId = this.route.snapshot.paramMap.get('id');

    if (comercioId) {
      this.loadComercioData(comercioId);
    } else {
      console.error('No se encontró el ID del comercio');
    }
  }

  // Controla el scroll para mostrar o no la cabecera
  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    this.scrolled = scrollTop > 50;
  }

  // Cargar los datos de la tienda
  loadComercioData(id: string) {
    this.apiService.post(`comercio_app/${id}`, {}).then(response => {
      response.subscribe((data: any) => {
        this.comercio = data?.comercio;
        this.allProductos = data?.comercio?.articulos || [];

        const desc = `https://oneclic.app/comercio_descripcion/${data?.comercio?.idcomercio}`;
        this.description = this.sanitizer.bypassSecurityTrustResourceUrl(desc);

        const blog = `https://oneclic.app/comercio_miniweb/${data?.comercio?.idcomercio}`;
        this.miniWeb = this.sanitizer.bypassSecurityTrustResourceUrl(blog);

        // Ordenar los productos por el criterio seleccionado
        this.sortProducts();
        // Cargar los primeros productos
        this.loadMoreProducts(null);
        this.isLoading = false;
      });
    });
  }

  adjustIframeHeight(iframe: any) {
    const iframeWindow = iframe.contentWindow || iframe.contentDocument.parentWindow;
    if (iframeWindow.document.body) {
      iframe.style.height = iframeWindow.document.body.scrollHeight + 'px';
    }
  }

  adjustIframeHeightBlog() {
    const iframe = this.iframe.nativeElement;
    iframe.onload = () => {
      iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 30 + 'px';
    };
  }

  // Función para cargar más productos
  loadMoreProducts(event: any) {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const newProductos = this.allProductos.slice(start, end);
    this.productos = [...this.productos, ...newProductos];

    this.currentPage++;

    if (event) {
      event.target.complete();
    }

    if (this.productos.length >= this.allProductos.length && event) {
      event.target.disabled = true;
    }
  }

  // Función para ordenar productos
  sortProducts() {
    switch (this.sortBy) {
      case 'low-to-high':
        this.allProductos.sort((a, b) => a.precio - b.precio);
        break;
      case 'high-to-low':
        this.allProductos.sort((a, b) => b.precio - a.precio);
        break;
      case 'newest':
        this.allProductos.sort((a, b) => b.idarticulo - a.idarticulo);
        break;
      case 'alphabetical':
        this.allProductos.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'relevance':
      default:
        this.allProductos.sort((a, b) => b.visitas - a.visitas);
        break;
    }
    this.productos = this.allProductos.slice(0, this.currentPage * this.pageSize);
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

  // Función para abrir la imagen en un modal
  openImage(item: any) {
    this.selectedImage = item;
    this.isModalOpen = true;
  }

  // Cierra el modal
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if (!isOpen) {
      this.selectedImage = null; // Limpiar la imagen seleccionada
    }
  }

}