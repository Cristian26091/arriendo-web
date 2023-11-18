import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from '../../../models/payment';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  // Detalles de la compra
  fecha_inicio : Date = null;
  fecha_fin : Date = null;
  horaLLegada : string = '';
  numeroHabitacion : string = '';
  direccion : string;

  // Desgloce del precio
  precioBooking : number = 0;
  precioServicios : number = 0;
  precioTotal : number = 0;

  listadoServicios :{
    servicio : string,
    precio : number,
  }[] = [];

  constructor(private paymentService : PaymentService) { }

  ngOnInit(): void {
    this.fecha_inicio = this.paymentService.booking$.fecha_inicio;
    this.fecha_fin = this.paymentService.booking$.fecha_fin;
    this.horaLLegada = this.paymentService.horaLLegada;
    this.numeroHabitacion = this.paymentService.room$.numero.toString();
    this.direccion = this.paymentService.room$.calle + ', ' + this.paymentService.room$.comuna + ', ' + this.paymentService.room$.region;

    this.listadoServicios = this.paymentService.selectedServices$.map((service) => ({
      servicio: service.nombre,
      precio: service.precio,
    }));

    this.precioServicios = this.calculateServicesPrice().valueOf();
    this.precioBooking = this.paymentService.booking$.precio.valueOf();
    console.log(this.precioBooking.valueOf())
    console.log(this.precioServicios.valueOf())
    this.precioTotal = this.calculateTotalPrice(this.precioBooking, this.precioServicios).valueOf();
    
  }

  calculateTotalPrice(bookingPrice : Number, servicesPrice : Number) : Number{
    return bookingPrice.valueOf() + servicesPrice.valueOf();
  }

  calculateServicesPrice() : Number{
    let totalServicesPrice = 0;
    this.paymentService.selectedServices$.forEach(service => {
      totalServicesPrice += service.precio;
      console.log(totalServicesPrice.valueOf())
    });
    return totalServicesPrice;
  }

  formateDate(date: Date): string  {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }



}
