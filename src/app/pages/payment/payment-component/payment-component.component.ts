import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';

import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';

import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/models/payment';

import { forkJoin, Observable } from 'rxjs';


@Component({
  selector: 'app-payment-component',
  templateUrl: './payment-component.component.html',
  styleUrls: ['./payment-component.component.css']
})
export class PaymentComponentComponent implements OnInit {

  currentStep = 1;
  currentContent: string = '';

  //estado inicial del stepper
  hideNextButton: boolean = false;
  hidePreviousButton: boolean = true;

  // Dentro de tu componente
  steps = [
    { title: 'Servicios', content: 'services'},
    { title: 'Tus datos', content: 'details' },
    { title: 'Resumen de compra', content: 'resumen' },
    { title: 'Pago', content: 'payment' },
  ];

  bookingID : string | undefined;
  userID : string | undefined;
  roomID : string | undefined;

  isCurrentFormComplete: boolean = false;

  constructor(private cookieService: CookieService,
    private bookingService : BookingService,
    private userService : UserService,
    private roomService: RoomService,
    public paymentService : PaymentService) { }

   ngOnInit(): void{
    this.currentContent = this.steps[0].content;

    // logica de los datos
    if (this.cookieService.check('booking_id')) {
      const bookingID = this.cookieService.get('booking_id');
      // obtengo la reserva a través del id de la cookie
      this.getBooking(bookingID); //reservation

    } 

  }

  ngOnDestroy(): void {
    if (this.cookieService.check('booking_id')) {
      this.cookieService.delete('booking_id');
    }
  }

  getBooking(bookingID : string):void{

    try{
      this.bookingService.getBooking(bookingID).subscribe(
        (res) => {
          this.paymentService.booking$ = res as Booking;
          this.getUser(this.paymentService.booking$.userId);
          this.getRoom(this.paymentService.booking$.roomId);
        },
        (err) => console.log(err)
    
      );
    } catch (error) {
      console.error(error);
    }
  
  }

  getUser(userID : string):void{
      
      try{
        this.userService.getUser(userID).subscribe(
          (res) => {
            this.paymentService.user$ = res as User;
          },
          (err) => console.log(err)
      
        );
      } catch (error) {
        console.error(error);
      }
  }

  getRoom(roomID : string):void{
      
    try{
      this.roomService.getRoom(roomID).subscribe(
        (res) => {
          this.paymentService.room$ = res as Room;
        },
        (err) => console.log(err)
    
      );
    } catch (error) {
      console.error(error);
    }
  }


  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.currentContent = this.steps[this.currentStep - 1].content;
    }
    this.updateButtonVisibility();
  }

  nextStep() {
   
    if (this.currentStep < this.steps.length) {
      // Verifica si el formulario actual está completo antes de permitir el siguiente paso
      if (this.paymentService.isFormComplete(this.currentContent)) {
        // Cambia el estado del formulario actual al siguiente paso
        this.paymentService.estadoFormularios[this.currentContent] = true;

        this.currentStep++;
        this.currentContent = this.steps[this.currentStep - 1].content;
      } else {
        console.log('Completa el formulario antes de continuar.');
      }
    }

    this.isCurrentFormComplete = this.paymentService.isFormComplete(this.currentContent);
    this.updateButtonVisibility();
  }

  updateButtonVisibility() {
    this.hideNextButton = this.currentStep === 4;
    this.hidePreviousButton = this.currentStep === 1;
  }

  
}
