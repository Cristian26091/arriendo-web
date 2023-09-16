import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit{
  selected = null;
  tooltip: string = ''; // Inicialmente, el tooltip está vacío

  constructor(private roomService: RoomService) { }
  

  ngOnInit(): void{}

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Verifica si la fecha está en alguna reserva
    const formattedDate = this.formatDate(cellDate);
    const isDateInReservation = this.roomService.selectedRoom.reservas.some(reserva => {
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
  };

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }
  
}
