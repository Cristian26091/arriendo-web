import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Booking } from 'src/app/models/booking';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/room';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(public bookingService: BookingService, private cookieService: CookieService, private roomService: RoomService) {}

  ngOnInit(): void {

      const userID = this.cookieService.get('user_id');
      console.log(userID);
      this.bookingService.getBookingByUser(userID).subscribe(
        (res : Booking[]) => {
          this.bookingService.bookings = res;
          console.log(res);
          if(this.bookingService.bookings){
            // Ahora, para cada reserva, obtén la información de la habitación correspondiente
            this.bookingService.bookings.forEach((booking: Booking) => {
              const roomId = booking.roomId;
              this.roomService.getRoom(roomId).subscribe(
                (room: Room) => {
                  this.roomService.rooms.push(room);
                },
                (err) => console.log(err)
              )
            });
          }
          else{
            this.bookingService.bookings = [];
            console.log("No hay reservas");
          }
        },
        err => console.log(err)
      );
  }

  getRoomName(roomId: string): string {
    // Busca la información de la habitación por su roomId
    const room = this.roomService.rooms.find((room) => room._id === roomId);
    const name = room ? room.calle + ' ' + room.numero+ ',' + room.comuna +',' + room.region: 'Habitación no encontrada';
    return name;
  }

  cancelBooking(bookingId: string): void {
    // Mostrar una alerta de confirmación
    const confirmed = window.confirm('¿Estás seguro de que deseas cancelar esta reserva?');
    if (confirmed) {
      this.bookingService.deleteBooking(bookingId).subscribe(
        (res) => {
          // Elimina la reserva cancelada de la lista local de reservas
          this.bookingService.bookings = this.bookingService.bookings.filter(
            (booking) => booking._id !== bookingId
          );
          console.log(res);
        },
        (error) => {
          console.error('Error al cancelar la reserva:', error);
        }
      );
    }
    return;
    
  }
   

}
