import { Component} from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { CookieService } from 'ngx-cookie-service';
import { Room } from '../../../models/room';

@Component({
  selector: 'app-results-component',
  templateUrl: './results-component.component.html',
  styleUrls: ['./results-component.component.css']
})
export class ResultsComponentComponent {

  isRoomServiceVoid: boolean = false;

  constructor( public roomService: RoomService, private cookieService: CookieService) { }

  ngOnInit(): void {
    // Recupera los resultados de búsqueda desde las cookies (si existen)
    const savedSearch = this.cookieService.get('busquedaResultados');
    if (savedSearch) {
      this.roomService.rooms = JSON.parse(savedSearch) as Room[];
      console.log(this.roomService.rooms);
    }
    this.isRoomServiceVoid = this.roomService.roomsIsVoid();
  }

}


