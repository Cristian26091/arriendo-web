import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking';

import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-room-mate-card',
  templateUrl: './room-mate-card.component.html',
  styleUrls: ['./room-mate-card.component.css']
})
export class RoomMateCardComponent implements OnInit {
  users: User[] = []; // Array para almacenar los usuarios de las reservas
  


  constructor(private bookingService : BookingService, private roomService : RoomService, private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    if(this.roomService.selectedRoom != null){
      // Filtra las reservas que tienen estado 'confirmado'
      const confirmedBookings = this.bookingService.bookings.filter(booking => booking.estado === environment.estado.confirmada);

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
