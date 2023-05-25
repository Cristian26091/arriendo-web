import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponentComponent } from './pages/index/index-component/index-component.component';
import { ResultsComponentComponent } from './pages/results/results-component/results-component.component';
import { RoomComponentComponent } from './pages/information/room-component/room-component.component';
import { ContactComponent } from './pages/help/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register/register.component';

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
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
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
