import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StoresTabsPage } from './stores-tabs.page';
import { StoresTabsRoutingModule } from './stores-tabs-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoresTabsRoutingModule 
  ],
  declarations: [StoresTabsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoresTabsModule { }
