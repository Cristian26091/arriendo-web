import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Booking } from 'src/app/models/booking';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/room';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(public bookingService: BookingService, private cookieService: CookieService, private roomService: RoomService, private router: Router) {}

  async ngOnInit(): Promise<void> {

      const userID = this.cookieService.get('user_id');

      try {
        const res = await this.bookingService.getBookingByUser(userID).toPromise();
        this.bookingService.bookings = res as Booking[];

        if (this.bookingService.bookings) {
          for (const booking of this.bookingService.bookings) {
              const roomId = booking.roomId;
              const room = await this.roomService.getRoom(roomId).toPromise();
              this.roomService.rooms.push(room);
          }
      } else {
          this.bookingService.bookings = [];
          console.log("No hay reservas");
      }

      } catch (error) {
        console.error(error);
      }
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

  isConfirmed(booking: Booking): boolean {
    return booking.estado === environment.estado.confirmada;
  }

  goToPayment(){
    this.router.navigate(['/payment']);
  }
   

}
