import { Component} from '@angular/core';
import { Room } from 'src/app/models/room';
import { RoomService } from '../../../services/room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results-component',
  templateUrl: './results-component.component.html',
  styleUrls: ['./results-component.component.css']
})
export class ResultsComponentComponent {

  isRoomServiceVoid: boolean = false;

  constructor( public roomService: RoomService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.isRoomServiceVoid = this.roomService.roomsIsVoid();
    console.log(this.isRoomServiceVoid);
  }

}


