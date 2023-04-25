import { Component, Input, OnInit} from '@angular/core';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-data-room-container',
  templateUrl: './data-room-container.component.html',
  styleUrls: ['./data-room-container.component.css']
})
export class DataRoomContainerComponent {

  banio_compartido: string = "";
  constructor(public roomService: RoomService){}


  ngOnInit(): void {
    
    this.parserTipoBanio(this.roomService.selectedRoom.banio_compartido);
    console.log(this.roomService.selectedRoom);
  }

  parserTipoBanio(isCompartido: Boolean){
    if(isCompartido){
      this.banio_compartido = "Si";
    }
    this.banio_compartido = "No"
  }

}
