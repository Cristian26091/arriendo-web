import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../../../models/room';
import {Router} from '@angular/router'
import { RoomService } from '../../../services/room.service';


@Component({
  selector: 'app-card-room',
  templateUrl: './card-room.component.html',
  styleUrls: ['./card-room.component.css']
})
export class CardRoomComponent implements OnInit{

  @Input() room: Room = null;
  
  constructor(private router: Router, private roomService: RoomService){}

  ngOnInit(): void {
    
  }

  goToRoom(id:string){
    this.roomService.selectedRoom = this.room;
    this.router.navigateByUrl("/room/"+id);
  }
}
