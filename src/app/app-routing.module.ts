import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponentComponent } from './pages/index/index-component/index-component.component';
import { ResultsComponentComponent } from './pages/results/results-component/results-component.component';
import { RoomComponentComponent } from './pages/information/information-component/room-component.component';
import { ContactComponent } from './pages/help/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register/register.component';
import { HelpComponentComponent } from './pages/help/help-component/help-component.component';
import { FAQComponent } from './pages/help/faq/faq.component';
import { PaymentComponentComponent } from './pages/payment/payment-component/payment-component.component';
import { AdminComponentComponent } from './pages/admin/admin-component/admin-component.component';


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
    component: HelpComponentComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'help',
    component: FAQComponent

  },

  {
    path: 'claim',
    component: ContactComponent
  },

  {
    path: 'payment',
    component: PaymentComponentComponent
  },

  {
    path: 'admin',
    component: AdminComponentComponent
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
