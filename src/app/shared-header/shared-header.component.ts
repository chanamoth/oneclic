import { Component, Input, HostListener  } from '@angular/core';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.scss'],
})
export class SharedHeaderComponent {
  @Input() title: string = ''; // El título será dinámico
  @Input() isLoading: boolean = false;

  scrolled: boolean = false; // Propiedad para manejar el scroll

  // Escuchar el evento de scroll
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrolled = scrollTop > 50; // Si se ha desplazado más de 50px
  }

}