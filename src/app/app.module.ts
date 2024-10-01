import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Network } from '@ionic-native/network/ngx';
import { OfflineMessageComponent } from './shared/offline-message/offline-message.component';

@NgModule({
  declarations: [AppComponent, OfflineMessageComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Asegúrate de incluirlo aquí si se necesita
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [Network],
  bootstrap: [AppComponent]
})
export class AppModule { }
