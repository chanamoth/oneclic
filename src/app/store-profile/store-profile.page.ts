import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';  // Importar DomSanitizer y SafeResourceUrl

@Component({
  selector: 'app-store-profile',
  templateUrl: './store-profile.page.html',
  styleUrls: ['./store-profile.page.scss'],
})
export class StoreProfilePage implements OnInit {
  comercio: any;
  productos: any[] = [];
  serverUrl: string;
  miniwebUrl: SafeResourceUrl = '';  // Cambiar a SafeResourceUrl para URL sanitizada
  selectedTab: string = 'about';  // Tab seleccionado por defecto

  @ViewChild('miniweb', { static: false }) iframe!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private sanitizer: DomSanitizer  // Inyectar DomSanitizer
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

  // Cargar los datos de la tienda
  loadComercioData(id: string) {
    this.apiService.post(`comercio_app/${id}`, {}).then(response => {
      response.subscribe((data: any) => {
        this.comercio = data?.comercio;

        // Formar la URL de la miniweb del comercio y sanitizarla
        const miniweb = `https://oneclic.app/comercio_miniweb/${data?.comercio?.idcomercio}`;
        this.miniwebUrl = this.sanitizer.bypassSecurityTrustResourceUrl(miniweb);  // Sanitizar la URL
      });
    });
  }

  // Ajustar la altura del iframe
  adjustIframeHeight(event: any) {
    const iframe = event.target;
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 30 + 'px';
  }
}