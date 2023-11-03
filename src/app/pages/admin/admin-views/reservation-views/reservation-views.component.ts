import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/room';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reservation-views',
  templateUrl: './reservation-views.component.html',
  styleUrls: ['./reservation-views.component.css']
})
export class ReservationViewsComponent implements OnInit {

  currentRoute: string = "";
  currentRouteParts: string[] = ["primero", "segundo"];
  headTableContent: string[];
  
  selectedBooking: Booking | undefined;

  constructor(public bookingService: BookingService, public userService: UserService, public roomService: RoomService) { 
    this.headTableContent = ["ID", "Fecha reserva","Fecha termino", "Estado", "Acciones"];
  }

  ngOnInit(): void {
    this.getBookings();
  }
  

  getBookings(){
    if(this.bookingService.bookings){
      this.bookingService.getBookings().subscribe(res =>{
        this.bookingService.bookings = res as Booking[];
      })
    }
    return;
  }

  deleteBooking(){
    if (this.bookingService.selectedBookin) {
      // No hay habitación seleccionada, no se puede eliminar
      this.bookingService.deleteBooking(this.bookingService.selectedBookin._id)
      .subscribe(() => {
        // La habitación se eliminó correctamente, puedes actualizar la lista de habitaciones si es necesario.
        this.getBookings(); // Otra vez, obtén las habitaciones actualizadas.
        // Cierra el modal de confirmación de eliminación
        // $('#confirmDeleteModal').modal('hide');
      });
    }
    return;
  }

  selectToDeleteItem(item:Booking){
    this.bookingService.selectedBookin = item;
  }

  selectToViewInfo(item:Booking){
    this.bookingService.selectedBookin = item;
    this.getUser(item.userId);
    this.getRoom(item.roomId);

  }

  selectToAprove(item:Booking){
    this.bookingService.selectedBookin = item;
    this.bookingService.selectedBookin.estado = environment.estado.confirmada;
    this.bookingService.putBooking(this.bookingService.selectedBookin).subscribe(res =>{
      this.getBookings();
    })
  }

  getUser(_id: string){
    this.userService.getUser(_id).subscribe(res =>{
      this.userService.selectedUser = res as User;
    })
  }

  getRoom(_id:string){
    this.roomService.getRoom(_id).subscribe(res =>{
      // console.log("res dentro de reservation-view component:",res);
      this.roomService.selectedRoom = res as Room;
      // this.roomService.selectedRoom = res as Room;
    })
  }

  downloadPdf(booking: Booking){
    
  }

}
