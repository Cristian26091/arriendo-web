import { Component, OnInit } from '@angular/core';
import { Room } from '../../../../models/room';
import { RoomService } from '../../../../services/room.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-room-views',
  templateUrl: './room-views.component.html',
  styleUrls: ['./room-views.component.css'],
  providers: [CurrencyPipe],
})


export class RoomViewsComponent implements OnInit {

  currentRoute: string = "";
  currentRouteParts: string[] = ["primero", "segundo"];
  headTableContent: string[];

  constructor(public RoomService: RoomService, private currencyPipe: CurrencyPipe, private router: Router, ) { 
    this.headTableContent = ["ID", "Dirección", "Fecha publicación", "Precio", "Estado", "Acción"];
    this.getrooms();
  }

  ngOnInit(): void {

  }

  editarItem(item){
    console.log(item);
  }

  eliminarItem(item){
    console.log(item);
  }

  getrooms(){
    this.RoomService.getRooms()
      .subscribe( res =>{
        this.RoomService.rooms = res as Room[];
    });
  }

  formatPrice(price: String): number {
    // Convierte el precio de String a número
    const priceAsNumber: number = parseInt(price.toString());
    // Formatea el número como moneda
    return priceAsNumber;
  }

  addRoom(){
    console.log("add");
    this.router.navigate(['/admin/room/add']);
  }

  

}
