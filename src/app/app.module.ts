import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SharedRefresherComponent } from './shared-refresher/shared-refresher.component';

@NgModule({
  declarations: [AppComponent, SharedRefresherComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Asegúrate de incluirlo aquí si se necesita
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  exports: [
    SharedRefresherComponent // Exportar para usar en otros lugares
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
