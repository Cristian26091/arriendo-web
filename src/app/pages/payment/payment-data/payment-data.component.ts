import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from '../../../models/payment';

@Component({
  selector: 'app-payment-data',
  templateUrl: './payment-data.component.html',
  styleUrls: ['./payment-data.component.css']
})
export class PaymentDataComponent implements OnInit {
  nombres : string = '';
  apellidos : string = '';
  email : string = '';
  telefono : string = '';
  peticiones : string = '';
  horaLlegada : string = '';


  reglas: string[] = [
    "Respetar el horario de silencio",
    "No fumar dentro de las habitaciones",
    "Mantener el orden y la limpieza"
  ];

    constructor(public paymentService : PaymentService) { }

  ngOnInit(): void {
    this.nombres = this.paymentService.user$.nombre;
    this.apellidos = this.paymentService.user$.apellido;
    this.email = this.paymentService.user$.email;
    this.telefono = this.paymentService.user$.telefono;

  }

  peticionesOnChange(event: any) {
    // console.log(event);
    console.log(this.peticiones);
  }

  horaLlegadaOnChange(event: any) {
    // console.log(event);
    console.log(this.horaLlegada);
  }

}
