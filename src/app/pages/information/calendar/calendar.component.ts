import { Component, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

import { Room } from '../../../models/room';
import { RoomService } from '../../../services/room.service';

import { Booking } from 'src/app/models/booking';
import { BookingService } from '../../../services/booking.service';

import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  tooltip: string = ''; // Inicialmente, el tooltip está vacío

  // testDates: Date[] = [
  //   new Date(), // Fecha actual
  //   new Date('2023-11-18'), // Fecha específica
  //   new Date('2023-11-19'), // Otra fecha específica
  //   new Date('2023-11-20'), // Otra fecha específica
  //   new Date('2023-11-21'), // Otra fecha específica
  //   new Date('2023-11-22'), // Otra fecha específica
  //   // Puedes agregar más fechas según tus necesidades
  // ];

  bookings: Booking[] = [];
  dataLoaded = false;  // Variable de bandera para controlar la carga de datos


  constructor(public bookingService: BookingService, private roomService : RoomService, private cookieService : CookieService ) { }
  

  ngOnInit() {
  
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate) => {
      
      // Verifica si la fecha está en alguna reserva
      const formattedDate = this.formatDate(cellDate);

      const isDateInReservation = this.bookingService.bookings.some((reserva) => {
        const reservaInicio = this.formatDate(new Date(reserva.fecha_inicio));
        const reservaFin = this.formatDate(new Date(reserva.fecha_fin));
        return formattedDate >= reservaInicio && formattedDate <= reservaFin;
      });

      // Verifica las fechas de prueba
      // const isDateInTestDates = this.testDates.some((testDate) => {
      //   const formattedTestDate = this.formatDate(testDate);
      //   return formattedDate === formattedTestDate;
      // });

      if (isDateInReservation) {
        return "custom-marked-date";
      } else {
        this.tooltip = ''; // Puedes personalizar este mensaje
        return '';
      }
  };

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  
}
