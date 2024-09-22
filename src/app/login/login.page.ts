import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content!: IonContent;

  scrolled: boolean = false;

  email: string = '';  // Declaración de la propiedad 'email'
  password: string = '';  // Declaración de la propiedad 'password'

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off-outline';

  constructor() { }

  ngOnInit() {
    
  }

  // Controla el scroll para mostrar o no la cabecera
  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    this.scrolled = scrollTop > 50;
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-outline' ? 'eye-off-outline' : 'eye-outline';
  }
}
