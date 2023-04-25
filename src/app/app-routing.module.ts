import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponentComponent } from './Index/index-component/index-component.component';
import { ResultsComponentComponent } from './results/results-component/results-component.component';
import { RoomComponentComponent } from './room/room-component/room-component.component';
import { ContactComponent } from './contact&support/contact/contact.component';
import { RentComponentComponent } from './rent/rent-component/rent-component.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponentComponent
  },
  {
    path: 'results',
    component: ResultsComponentComponent
  },
  {
    path: 'room/:id',
    component: RoomComponentComponent
  },
  {
    path: 'contact&support',
    component: ContactComponent
  },
  {
    path: 'rent',
    component: RentComponentComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // Ruta inicial redirecciona al index
  {
    path: '', 
    redirectTo: '/index', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
