import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

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
  isLoading: boolean = true;
  serverUrl: string;
  categorias: any[] = [];

  constructor(public apiService: ApiService) {
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

  loadInitialData() {
    this.isLoading = true;

    this.apiService.post('search/get_categorias_app', {}).then(response => {
      response.subscribe((data: any) => {
        if (data?.results?.categorias) {
          this.categorias = data.results.categorias;
        }
        this.isLoading = false;
      }, () => {
        this.isLoading = false; // Manejar el error
      });
    });
  }

}
