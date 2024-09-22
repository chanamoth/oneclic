import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OficialStoresPage } from './oficial-stores.page';

const routes: Routes = [
  {
    path: '',
    component: OficialStoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OficialStoresPageRoutingModule { }
