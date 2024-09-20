import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OficialStoresPage } from './oficial-stores.page';
import { OficialStoresPageRoutingModule } from './oficial-stores-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OficialStoresPageRoutingModule,
    SharedModule
  ],
  declarations: [OficialStoresPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OficialStoresPageModule {}
