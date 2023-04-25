import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../../models/room';
import {Router, ActivatedRoute} from '@angular/router'
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-card-room',
  templateUrl: './card-room.component.html',
  styleUrls: ['./card-room.component.css']
})
export class CardRoomComponent implements OnInit{

  @Input() room: Room = null;
  
  // constructor( public roomService: RoomService){}
  constructor( private activaterouter: ActivatedRoute, private router: Router, private roomService: RoomService){}

  ngOnInit(): void {
    // this.id = this.room._id;
    let pacienteId = this.activaterouter.snapshot.paramMap.get('id')
    //console.log(pacienteId);
  }

  goToRoom(id:string){
    this.roomService.selectedRoom = this.room;
    // console.log("caca2");
    // console.log(typeof(this.roomService.selectedRoom.latitud));
    // console.log(typeof(this.roomService.selectedRoom.longitud));
    this.router.navigateByUrl("/room/"+id);
  }
}
