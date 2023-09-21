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
    this.RoomService.deleteRoom(this.RoomService.selectedRoom._id)
    .subscribe(() => {
      // La habitación se eliminó correctamente, puedes actualizar la lista de habitaciones si es necesario.
      this.getrooms(); // Otra vez, obtén las habitaciones actualizadas.
      // Cierra el modal de confirmación de eliminación
      // $('#confirmDeleteModal').modal('hide');
    });
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

  // En tu componente
  handleDragOver(event: DragEvent) {
    event.preventDefault();//previene comportamiento default
  }

  handleDrop(event: DragEvent) {
    event.preventDefault(); //previene comportamiento default
    const file = event.dataTransfer.files[0]; //se asume es un solo archivo
    if (file) {
      // Obtiene la extensión del archivo
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (['obj', 'mtl', 'zip'].includes(fileExtension)) {
        // Cierra el modal de carga de modelo
        $('#addRoomModal').modal('hide');
        // Redirige a la ruta del formulario de registro habitación
        this.router.navigate(['/admin/room/add']);
        // Inicia la carga del modelo aquí utilizando una función o servicio adecuado.
        this.loadModelInBackground(file);
      } else {
        // Muestra un mensaje de error al usuario
        alert('La extensión del archivo no es válida. Las extensiones permitidas son: obj, mtl, zip.');
      }
    }
  }

  loadModelInBackground(file: File) {
    // Aquí debes implementar la carga del modelo 3D en segundo plano.
    // Puedes utilizar una biblioteca o herramientas como Three.js si estás trabajando con modelos 3D en la web.
    // Mientras se carga el modelo, el usuario puede completar el formulario.
  }

  

}
