import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-views-add',
  templateUrl: './room-views-add.component.html',
  styleUrls: ['./room-views-add.component.css']
})
export class RoomViewsAddComponent implements OnInit {

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
  }

}
