import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking';

@Component({
  selector: 'app-reservation-views',
  templateUrl: './reservation-views.component.html',
  styleUrls: ['./reservation-views.component.css']
})
export class ReservationViewsComponent implements OnInit {

  currentRoute: string = "";
  currentRouteParts: string[] = ["primero", "segundo"];
  headTableContent: string[];

  constructor(public bookingService: BookingService) { 
    this.headTableContent = ["ID", "Fecha reserva","Fecha termino", "Estado", "Aciones"];
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

}
