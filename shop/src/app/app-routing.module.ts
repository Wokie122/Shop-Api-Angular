import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {SklepComponent} from './sklep/sklep.component';
import {ArtykulyComponent} from './artykuly/artykuly.component';
import {FormularzComponent} from './formularz/formularz.component';
import {KoszykComponent} from './koszyk/koszyk.component';
import {LogowanieComponent} from './logowanie/logowanie.component';
import {AutoryzacjaGuard} from './autoryzacja/autoryzacja.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    canActivate: [AutoryzacjaGuard]
  },
  {
    path: 'logowanie',
    component: LogowanieComponent
  },
  {
    path: 'koszyk',
    component: KoszykComponent,
    canActivate: [AutoryzacjaGuard]
  },
  {
    path: 'artykuly', children: [
      {path: '', component: SklepComponent, canActivate: [AutoryzacjaGuard]},
      {path: 'nowy', component: FormularzComponent, canActivate: [AutoryzacjaGuard], data: {dozwolonaRola: 'Admin'}},
      {path: ':id', component: FormularzComponent, canActivate: [AutoryzacjaGuard], data: {dozwolonaRola: 'Admin'}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
