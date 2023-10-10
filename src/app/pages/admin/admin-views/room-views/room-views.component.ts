import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Room } from '../../../../models/room';
import { RoomService } from '../../../../services/room.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import * as $ from 'jquery';

declare var $: any; // Declaración de jQuery

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

  constructor(public RoomService: RoomService, private currencyPipe: CurrencyPipe, private router: Router, private el: ElementRef ) { 
    this.headTableContent = ["ID", "Dirección", "Fecha publicación", "Precio", "Estado", "Acción"];
    this.getrooms();
  }

  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    
  }

  seletcToEdit(item){
    this.RoomService.selectedRoom = item;
  }

  selectToDelete(item){
    this.RoomService.selectedRoom = item;
  }

  editRoom(){

  }

  deleteRoom(){
    if (this.RoomService.selectedRoom) {
      // No hay habitación seleccionada, no se puede eliminar
      this.RoomService.deleteRoom(this.RoomService.selectedRoom._id)
      .subscribe(() => {
        // La habitación se eliminó correctamente, puedes actualizar la lista de habitaciones si es necesario.
        this.getrooms(); // Otra vez, obtén las habitaciones actualizadas.
        // Cierra el modal de confirmación de eliminación
        // $('#confirmDeleteModal').modal('hide');
      });
    }
    return;
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

  goToAddRoom(){
    this.router.navigate(['/admin/room/add']);
  }

}
