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
import { SearcherComponent } from './auxComponents/searcher/searcher.component';
import { ImageSliderComponent } from './auxComponents/image-slider/image-slider.component';
import { CardRoomComponent } from './auxComponents/card-room/card-room.component';
import { CalendarComponent } from './auxComponents/calendar/calendar/calendar.component';
import { DataRoomContainerComponent } from './auxComponents/data-room-container/data-room-container/data-room-container.component';
import { RoomImageSliderComponent } from './auxComponents/room-image-slider/room-image-slider/room-image-slider.component';
import { MapComponent } from './auxComponents/map/map/map.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 


// LOGICA DEL PROYECTO
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact&support/contact/contact.component';
import { IndexComponentComponent } from './Index/index-component/index-component.component';
import { RentComponentComponent } from './rent/rent-component/rent-component.component';
import { ResultsComponentComponent } from './results/results-component/results-component.component';
import { RoomComponentComponent } from './room/room-component/room-component.component';
import { ToolbarComponent } from './auxComponents/toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { StepperComponent } from './rent/rent-component/stepper/stepper/stepper.component';
import { FAQComponent } from './auxComponents/faq/faq.component';
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
import { FilterResultComponent } from './auxComponents/filter-result/filter-result.component';
import { DimensionmodelComponent } from './dimensionmodel/dimensionmodel.component';




@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    IndexComponentComponent,
    RentComponentComponent,
    ResultsComponentComponent,
    RoomComponentComponent,
    ToolbarComponent,
    LoginComponent,
    StepperComponent,
    FAQComponent,
    SearcherComponent,
    ImageSliderComponent,
    CardRoomComponent,
    CalendarComponent,
    DataRoomContainerComponent,
    RoomImageSliderComponent,
    MapComponent,
    FilterResultComponent,
    DimensionmodelComponent,

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
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ],
})
export class AppModule { }
