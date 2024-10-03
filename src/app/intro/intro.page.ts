import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private router: Router, private storage: Storage) { }

  async ngOnInit() {
    console.log("Inicializando almacenamiento...");
    await this.storage.create();
    console.log("Almacenamiento inicializado");
  }

  async skipIntro() {
    console.log("Marcando intro como visto...");
    await this.storage.set('introSeen', true);
    console.log("Intro marcado como visto");
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

}