import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shared-refresher',
  templateUrl: './shared-refresher.component.html',
  styleUrls: ['./shared-refresher.component.scss']
})
export class SharedRefresherComponent {

  // Evento para emitir cuando se refresque
  @Output() refreshEvent = new EventEmitter<void>();

  constructor() { }

  // Método para manejar el refresco
  handleRefresh(event: any) {
    this.refreshEvent.emit(); // Emitir evento cuando se refresque
    setTimeout(() => {
      event.target.complete(); // Completar el refresher después de un tiempo
    }, 1500); // Tiempo simulado de 1.5s antes de completar el refresco
  }
}