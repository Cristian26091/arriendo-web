import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { BookingService } from '../../../services/booking.service';
import { CookieService } from 'ngx-cookie-service';
import { Booking } from 'src/app/models/booking';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit, AfterViewInit {
  selected = null;
  tooltip: string = ''; // Inicialmente, el tooltip está vacío

  constructor(private bookingService: BookingService, private changeDetectorRef: ChangeDetectorRef) { }
  

  async ngOnInit(): Promise<void> {
    
  }
  ngOnDestroy(): void {
   
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate) => {
    if (this.bookingService.bookings.length > 0) {
      // Verifica si la fecha está en alguna reserva
      const formattedDate = this.formatDate(cellDate);
      const isDateInReservation = this.bookingService.bookings.some((reserva) => {
        const reservaInicio = this.formatDate(new Date(reserva.fecha_inicio));
        const reservaFin = this.formatDate(new Date(reserva.fecha_fin));
        return formattedDate >= reservaInicio && formattedDate <= reservaFin;
      });
      if (isDateInReservation) {
        this.tooltip = 'Reservado'; // Puedes personalizar este mensaje
        return "custom-marked-date";
      } else {
        this.tooltip = ''; // Puedes personalizar este mensaje
        return '';
      }
    } else {
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
