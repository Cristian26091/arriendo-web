import { Component} from '@angular/core';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-results-component',
  templateUrl: './results-component.component.html',
  styleUrls: ['./results-component.component.css']
})
export class ResultsComponentComponent {

  isRoomServiceVoid: boolean = false;

  constructor( public roomService: RoomService) { }

  ngOnInit(): void {
    this.isRoomServiceVoid = this.roomService.roomsIsVoid();
    //console.log(this.isRoomServiceVoid);
  }

}


