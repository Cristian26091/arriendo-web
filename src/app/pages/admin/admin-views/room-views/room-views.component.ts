import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-views',
  templateUrl: './room-views.component.html',
  styleUrls: ['./room-views.component.css']
})
export class RoomViewsComponent implements OnInit {

  currentRoute: string = "";
  currentRouteParts: string[] = ["primero", "segundo"];
  headTableContent: string[];
  data = [
  { 
    id: 1,
    direccion: "123 Calle Principal",
    fechaPublicacion: "2023-08-15",
    precio: 150000,
    estado: "Disponible"
  },
  { 
    id: 2,
    direccion: "456 Avenida Secundaria",
    fechaPublicacion: "2023-08-16",
    precio: 180000,
    estado: "En proceso de venta"
  },
  { 
    id: 3,
    direccion: "789 Calle Tranquila",
    fechaPublicacion: "2023-08-17",
    precio: 210000,
    estado: "Vendido"
  },
  
  // Agrega más elementos según sea necesario
];


  constructor() { 
    this.headTableContent = ["ID", "Dirección", "Fecha publicación", "Precio", "Estado", "Acción"];
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
