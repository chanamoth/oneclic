import { Component, Input, HostListener  } from '@angular/core';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.scss'],
})
export class SharedHeaderComponent {
  @Input() title: string = ''; // El título será dinámico
  @Input() isLoading: boolean = false;
  @Input() scrolled: boolean = false;

}