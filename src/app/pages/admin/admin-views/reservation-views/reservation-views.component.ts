import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-views',
  templateUrl: './reservation-views.component.html',
  styleUrls: ['./reservation-views.component.css']
})
export class ReservationViewsComponent implements OnInit {

  currentRoute: string = "";
  currentRouteParts: string[] = ["primero", "segundo"];
  headTableContent: string[];
  data = [
    {
      id: 1,
      fechaReserva: "2023-08-18",
      estado: "Pendiente"
    },
    {
      id: 2,
      fechaReserva: "2023-08-19",
      estado: "Confirmada"
    },
    {
      id: 3,
      fechaReserva: "2023-08-20",
      estado: "Cancelada"
    },
    // Agrega más reservas según sea necesario
  ];

  constructor() { 
    this.headTableContent = ["ID", "Fecha reserva", "Estado", "Aciones"];
  }

  ngOnInit(): void {
  }

  editarItem(item){
    console.log(item);
  }

  eliminarItem(item){
    console.log(item);
  }

}
