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
    if (environment.showIntroAlways) {
      return true;
    }

    // En modo producción, solo muestra si no ha sido visto antes
    const introSeen = await this.storage.get('introSeen');
    if (introSeen) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
      return false;
    } else {
      return true;
    }
  }

}
