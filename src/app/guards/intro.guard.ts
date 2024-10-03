import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment'; // Importa los entornos

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {

  constructor(private storage: Storage, private router: Router) { }

  async canLoad(): Promise<boolean> {

    // Si estamos en modo desarrollo, muestra siempre el intro
    /*if (environment.showIntroAlways) {
      console.log("Modo desarrollo: mostrando intro");
      return true;
    }*/

    // Comprobando si el intro ha sido visto
    const introSeen = await this.storage.get('introSeen');
    console.log("Intro seen:", introSeen);

    if (introSeen) {
      console.log("Intro ya fue visto, redirigiendo a /home");
      this.router.navigateByUrl('/home', { replaceUrl: true });
      return false;
    } else {
      console.log("Mostrando intro");
      return true;
    }
  }

}