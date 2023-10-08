import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../../../models/room';
import {Router} from '@angular/router'
import { RoomService } from '../../../services/room.service';
import { CookieService } from 'ngx-cookie-service'; // Importa CookieService


@Component({
  selector: 'app-card-room',
  templateUrl: './card-room.component.html',
  styleUrls: ['./card-room.component.css']
})
export class CardRoomComponent implements OnInit{

  @Input() room: Room = null;
  
  constructor(private router: Router, private roomService: RoomService, private cookieService: CookieService){}

  ngOnInit(): void {
    // Obtén el ID de la habitación seleccionada desde la cookie
    const selectedRoomId = this.cookieService.get('selectedRoomId');

    // Si se encuentra el ID en la cookie, carga la habitación correspondiente
    if (selectedRoomId) {
      // Utiliza el ID para cargar la habitación desde el servicio
      this.roomService.selectedRoom = this.roomService.getRoomById(selectedRoomId);
    }
  }

  goToRoom(id:string){
    this.roomService.selectedRoom = this.room;
    // Guarda el ID de la habitación seleccionada en una cookie
    this.cookieService.set('selectedRoomId', id);
    this.router.navigateByUrl(`/room/${id}`);
  }

}
