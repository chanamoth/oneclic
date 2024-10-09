import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content!: IonContent;

  scrolled: boolean = false;
  serverUrl: string;
  email: string = '';  // Declaración de la propiedad 'email'
  password: string = '';  // Declaración de la propiedad 'password'
  isLoading: boolean = false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off-outline';
  USER: string = '';
  isButtonDisabled: boolean = true;  // Controla si el botón está habilitado o no

  constructor(
    public apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController  // Inyección de AlertController
  ) {
    this.serverUrl = this.apiService.getServerUrl();
  }

  ngOnInit() { }

  login() {
    this.isLoading = true;

    this.apiService.post('usuario/login', { email: this.email, password: this.password, device: '', onesignalid: '', idart: '' }).then(response => {
      response.subscribe((data: any) => {
        if (!data?.usuario?.errores) {
          // Guardar el token y actualizar el usuario en AuthService
          localStorage.setItem('authToken', data.usuario.token);
          this.authService.setUser(data.usuario);  // Actualizar el usuario en AuthService

          this.USER = data.usuario;  // Actualizar la variable local

          // Redirigir al usuario
          if (data.usuario.paso_registro) {
            this.router.navigate(['/profile']); // Redirigir al perfil
          } else {
            this.router.navigate(['/home']); // Redirigir a la página de inicio
          }
        } else {
          // Mostrar errores
          this.showAlert(data.usuario.errores.join('\n'));
        }
        this.isLoading = false;
      }, () => {
        this.isLoading = false; // Manejar el error
      });
    });
  }

  // Controla el scroll para mostrar o no la cabecera
  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    this.scrolled = scrollTop > 50;
  }

  // Cambiar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-outline' ? 'eye-off-outline' : 'eye-outline';
  }

  // Verificar si los campos tienen al menos dos caracteres
  checkFormValidity() {
    this.isButtonDisabled = this.email.length < 2 || this.password.length < 2;
  }

  // Mostrar alertas de error
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error al ingresar',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}