import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';  // Declaración de la propiedad 'email'
  password: string = '';  // Declaración de la propiedad 'password'
  
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off-outline';

  constructor() { }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-outline' ? 'eye-off-outline' : 'eye-outline';
  }
}
