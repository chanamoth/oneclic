import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoresTabsPage } from './stores-tabs.page';

const routes: Routes = [
    {
        path: '',
        component: StoresTabsPage,
        children: [
            {
                path: 'oficial-stores',
                loadChildren: () => import('../../oficial-stores/oficial-stores.module').then(m => m.OficialStoresPageModule)
            },
            {
                path: 'favorites',
                loadChildren: () => import('../../favorites/favorites.module').then(m => m.FavoritesPageModule)
            },
            {
                path: '',
                redirectTo: 'oficial-stores',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'stores-tabs/oficial-stores',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoresTabsRoutingModule { }