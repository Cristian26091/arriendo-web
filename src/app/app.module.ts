import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon';
import { SearcherComponent } from './pages/index/searcher/searcher.component';
import { CardRoomComponent } from './pages/results/card-room/card-room.component';
import { CalendarComponent } from './pages/information/calendar/calendar.component';
import { DataRoomContainerComponent } from './pages/information/data-room-container/data-room-container.component';
import { MapComponent } from './pages/information/map/map.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 


// LOGICA DEL PROYECTO
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './pages/help/contact/contact.component';
import { IndexComponentComponent } from './pages/index/index-component/index-component.component';
import { ResultsComponentComponent } from './pages/results/results-component/results-component.component';
import { RoomComponentComponent } from './pages/information/information-component/room-component.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './pages/login/login.component';
import { FAQComponent } from './pages/help/faq/faq.component';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatListModule} from '@angular/material/list'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatNativeDateModule} from '@angular/material/core';
import { NgFor } from '@angular/common'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSliderModule} from '@angular/material/slider'; 

import { FormsModule } from '@angular/forms';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FilterResultComponent } from './pages/results/filter-result/filter-result.component';
import { DimensionmodelComponent } from './pages/information/dimensionmodel/dimensionmodel.component';
import { ErrorViewComponent } from './error-view/error-view.component';
import { RegisterComponent } from './pages/register/register/register.component';
import { IndexCarrouselComponent } from './pages/index/index-carrousel/index-carrousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardGridComponent } from './pages/help/card-grid/card-grid.component';
import { HelpComponentComponent } from './pages/help/help-component/help-component.component';
import { RentFormComponent } from './pages/information/rent-form/rent-form.component';
import { PaymentComponentComponent } from './pages/payment/payment-component/payment-component.component';
import { DetailsComponent } from './pages/payment/details/details.component';
import { PaymentDataComponent } from './pages/payment/payment-data/payment-data.component';
import { PaymentPaymentComponent } from './pages/payment/payment-payment/payment-payment.component';
import { AdminComponentComponent } from './pages/admin/admin-component/admin-component.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar/sidebar.component';
import { UserViewsComponent } from './pages/admin/admin-views/user-views/user-views.component';
import { ReservationViewsComponent } from './pages/admin/admin-views/reservation-views/reservation-views.component';
import { ClaimsViewsComponent } from './pages/admin/admin-views/claims-views/claims-views.component';
import { RoomViewsComponent } from './pages/admin/admin-views/room-views/room-views.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { RoomViewsAddComponent } from './pages/admin/admin-views/room-views/room-views-add/room-views-add/room-views-add.component';
import { CookieService } from 'ngx-cookie-service';
import { RoomViewsEditComponent } from './pages/admin/admin-views/room-views/room-views-edit/room-views-edit.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BookingComponent } from './pages/userBooking/booking/booking.component';
import { HistoryComponent } from './pages/userBooking/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    IndexComponentComponent,
    ResultsComponentComponent,
    RoomComponentComponent,
    ToolbarComponent,
    LoginComponent,
    FAQComponent,
    SearcherComponent,
    CardRoomComponent,
    CalendarComponent,
    DataRoomContainerComponent,
    MapComponent,
    FilterResultComponent,
    DimensionmodelComponent,
    ErrorViewComponent,
    RegisterComponent,
    IndexCarrouselComponent,
    FooterComponent,
    CardGridComponent,
    HelpComponentComponent,
    RentFormComponent,
    PaymentComponentComponent,
    DetailsComponent,
    PaymentDataComponent,
    PaymentPaymentComponent,
    AdminComponentComponent,
    SidebarComponent,
    UserViewsComponent,
    ReservationViewsComponent,
    ClaimsViewsComponent,
    RoomViewsComponent,
    DateFormatPipe,
    RoomViewsAddComponent,
    RoomViewsEditComponent,
    NotFoundComponent,
    BookingComponent,
    HistoryComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    NgFor,
    MatPaginatorModule,
    MatSliderModule,
    MatSlideToggleModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ],
})
export class AppModule { }
