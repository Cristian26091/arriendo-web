import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking';

import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-room-mate-card',
  templateUrl: './room-mate-card.component.html',
  styleUrls: ['./room-mate-card.component.css']
})
export class RoomMateCardComponent implements OnInit {
  users: User[] = []; // Array para almacenar los usuarios de las reservas
  


  constructor(private bookingService : BookingService, private roomService : RoomService, private userService: UserService, private cookieService: CookieService) { }

  async ngOnInit(): Promise<void> {

    if(this.cookieService.check('selectedRoomId')){
      const selectedRoomId = this.cookieService.get('selectedRoomId');
      await this.getRoomByID(selectedRoomId);
      const confirmedBookings = await this.getConfirmedBookings();
      console.log("Reservas confirmadas: ", confirmedBookings);

      // Crea un array de promesas para obtener los usuarios
      const userPromises = confirmedBookings.map(booking => this.getUserById(booking.userId));

      // Espera a que todas las promesas se completen
      this.users = await Promise.all(userPromises);

      // elimina los usuarios repetidos
      await this.removeDuplicateUsers();

    }
    else{
      console.log("no se ha seleccionado una habitación aun");
    }
  }

  async removeDuplicateUsers() {
    const uniqueUsers = new Map<string, User>();
    this.users.forEach(user => {
      uniqueUsers.set(user._id, user);
    });
    this.users = Array.from(uniqueUsers.values());
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

  async getUserById(id : string){
    try {
      const res = await this.userService.getUser(id).toPromise();
      return res as User;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  getAge(fecha_nacimiento : string){
    let today = new Date();
    let birthDate = new Date(fecha_nacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    if(month < 0 || (month === 0 && today.getDate() < birthDate.getDate())){
      age--;
    }
    return age;
  }

}
