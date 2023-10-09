import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css']
})
export class RentFormComponent implements OnInit {

  fechaInicio: Date = null;
  fechaTermino: Date = null;
  aceptaTerminos: boolean = false;

  //errores
  errorMessages = {
    fechaInicio: '',
    fechaTermino: '',
    aceptaTerminos: '',
  };


  constructor(private router: Router, private bookingService: BookingService, private userService: UserService, private roomService: RoomService) { }

  ngOnInit(): void {
    this.userService.loadUserFromCookies().subscribe(
      (user: User) => {
        this.userService.selectedUser = user;
        console.log("el usuario es: ", this.userService.selectedUser);
      },
      (error) => {
        console.log("Error al cargar el usuario:", error);
      }
    );
  }
  
  public validateInputs(): boolean {
    this.errorMessages.fechaInicio = this.fechaInicio ? '' : 'Debe ingresar una fecha de inicio';
    this.errorMessages.fechaTermino = this.fechaTermino ? '' : 'Debe ingresar una fecha de término';
    this.errorMessages.aceptaTerminos = this.aceptaTerminos ? '' : 'Debe aceptar los términos y condiciones';
  
    return (
      this.errorMessages.fechaInicio === '' &&
      this.errorMessages.fechaTermino === '' &&
      this.errorMessages.aceptaTerminos === ''
    );
  }
 
  submitForm(){
    //además debo validar las fechas que ya tienen reserva
    if(this.validateInputs()){  
      const bookingData = {
        _id: '',
        userId : this.userService.selectedUser._id,
        roomId : this.roomService.selectedRoom._id,
        fecha_inicio : this.fechaInicio,
        fecha_fin : this.fechaTermino,
        fecha_creacion: new Date(),
        estado : environment.estado.pendiente,
      }
      
      this.bookingService.postBooking(bookingData).subscribe(
        (res) => {
          console.log(res);
          // this.router.navigate(['/information']);
          alert("Reserva realizada con éxito");
        },
        (error) => {
          console.log(error);
        }
      );
      //extraer información del usuario
      console.log(this.userService.selectedUser);
      //extrer información de la habitación
      console.log(this.roomService.selectedRoom);
    }
  }
}
