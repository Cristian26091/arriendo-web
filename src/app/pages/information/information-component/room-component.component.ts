import { Component, OnInit, OnDestroy } from '@angular/core';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import { LoginService } from 'src/app/services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';



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
    console.log(selectedRoomId);
    // Si se encuentra el ID en la cookie, carga la habitación correspondiente
    if (selectedRoomId) {
      await this.getRoomByID(selectedRoomId);
      await this.getBookingsByRoomID(selectedRoomId);
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
      console.log("Habitación obtenida: ", this.roomService.selectedRoom);
    } catch (error) {
      console.log("Error al obtener la habitación", error);
    }
  }

  async getBookingsByRoomID(id:string){
    try {
      const res = await this.bookingService.getBookingByRoom(id).toPromise();
      this.bookingService.bookings = res as Booking[];
      console.log("Reservas obtenidas: ", this.bookingService.bookings);
    } catch (error) {
      console.log("Error al obtener las reservas de la habitación", error);
    }
  }

  toggleForms(){
    this.showLoginForm = !this.showLoginForm;
  }

}
