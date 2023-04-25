import { Component} from '@angular/core';
import { Room } from 'src/app/models/room';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-results-component',
  templateUrl: './results-component.component.html',
  styleUrls: ['./results-component.component.css']
})
export class ResultsComponentComponent {

  constructor( public roomService: RoomService ) { }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(){
    this.roomService.getRooms()
      .subscribe( res =>{
        this.roomService.rooms = res as Room[];
        console.log(res);
    });
  }

}


