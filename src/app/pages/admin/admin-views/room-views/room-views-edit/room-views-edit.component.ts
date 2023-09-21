import { Component, OnInit, Input } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-views-edit',
  templateUrl: './room-views-edit.component.html',
  styleUrls: ['./room-views-edit.component.css']
})
export class RoomViewsEditComponent implements OnInit {

  constructor(public roomService: RoomService) { }

  ngOnInit(): void {
  
  }

}
