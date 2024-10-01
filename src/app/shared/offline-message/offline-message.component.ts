import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-offline-message',  // Asegúrate de que este selector coincida
  templateUrl: './offline-message.component.html',
  styleUrls: ['./offline-message.component.scss'],
})
export class OfflineMessageComponent {
  @Input() isOnline: boolean = true;
  @Output() onRetry = new EventEmitter<void>();
}
