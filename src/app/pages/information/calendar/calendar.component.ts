import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  selected = null;


  constructor(private roomService: RoomService) { }
  

  ngOnInit(): void{
    console.log(this.roomService.selectedRoom.reservas)

  }

  dateClass = (date: Date): string => {
    const formattedDate = this.formatDate(date);
  
    // Verifica si la fecha está en alguna reserva
    const isDateInReservation = this.roomService.selectedRoom.reservas.some(reserva => {
      const reservaInicio = this.formatDate(new Date(reserva.fecha_inicio));
      const reservaFin = this.formatDate(new Date(reserva.fecha_fin));
      console.log("Fecha formateada", formattedDate)
      console.log("in - fin:", reservaInicio, reservaFin);
      return formattedDate >= reservaInicio && formattedDate <= reservaFin;

    });
    if (isDateInReservation) {
      console.log("isDateInReservation true");
      return "custom-marked-date";
    } else {
      console.log("isDateInReservation false");
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
