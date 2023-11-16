import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-data',
  templateUrl: './payment-data.component.html',
  styleUrls: ['./payment-data.component.css']
})
export class PaymentDataComponent implements OnInit {

  reglas: string[] = [
    "Respetar el horario de silencio",
    "No fumar dentro de las habitaciones",
    "Mantener el orden y la limpieza"
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
