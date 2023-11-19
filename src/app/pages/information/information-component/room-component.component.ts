import { Component, OnInit, OnDestroy } from '@angular/core';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import { LoginService } from 'src/app/services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-room-component',
  templateUrl: './room-component.component.html',
  styleUrls: ['./room-component.component.css']
})
export class RoomComponentComponent implements OnInit {

  showLoginForm = false;
  showSuccessAlert = false;

  constructor(
    public roomService: RoomService, 
    public loginService: LoginService, 
    private cookieService: CookieService,
    private bookingService: BookingService,
    ) { }

  async ngOnInit(): Promise<void> {
    // // Obtén el ID de la habitación seleccionada desde la cookie
    const selectedRoomId = this.cookieService.get('selectedRoomId');
    // console.log(selectedRoomId);
    // Si se encuentra el ID en la cookie, carga la habitación correspondiente
    if (selectedRoomId) {
      await this.getRoomByID(selectedRoomId);
      const confirmedBookings = await this.getConfirmedBookings();
      this.bookingService.bookings = [...confirmedBookings];
      console.log("Reservas confirmadazzzzzzs: ", confirmedBookings);
    }
    
  }

  ngOnDestroy(): void{
    // Elimina el ID de la habitación seleccionada de la cookie
    this.cookieService.delete('selectedRoomId');
  }

  async getRoomByID(id:string){
    try {
      const res = await this.roomService.getRoom(id).toPromise();
      this.roomService.selectedRoom = res as Room;
      // console.log("Habitación obtenida: ", this.roomService.selectedRoom);
    } catch (error) {
      console.log("Error al obtener la habitación", error);
    }
  }


  async getConfirmedBookings(): Promise<Booking[]> {
    try {
      const res = await this.bookingService.getBookingByRoom(this.roomService.selectedRoom._id).toPromise();
      this.bookingService.isBookingsLoaded = true;
      if (Array.isArray(res)) {
        return res.filter(booking => booking.estado === environment.estado.confirmada) as Booking[];
      } else {
        console.log("El resultado no es un arreglo:", res);
        return [];
      }
    } catch (error) {
      console.log("Error al obtener las reservas de la habitación", error);
      return [];
    }
  }

}
