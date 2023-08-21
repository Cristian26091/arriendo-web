import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-views',
  templateUrl: './user-views.component.html',
  styleUrls: ['./user-views.component.css']
})
export class UserViewsComponent implements OnInit {
  currentRoute: string = "";
  currentRouteParts: string[] = ["primero", "segundo"];
  headTableContent: string[];
  data = [
    {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan.perez@email.com",
      telefono: "555-123-4567",
      rut: "12.345.678-9"
    },
    {
      id: 2,
      nombre: "María Rodríguez",
      email: "maria.rodriguez@email.com",
      telefono: "555-987-6543",
      rut: "98.765.432-1"
    },
    {
      id: 3,
      nombre: "Carlos Sánchez",
      email: "carlos.sanchez@email.com",
      telefono: "555-567-8901",
      rut: "11.223.344-5"
    },
    // Agrega más usuarios según sea necesario
  ];
  constructor() { 
    this.headTableContent = ["ID", "Nombre", "Email", "Telefono", "Rut", "Acción"];
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
