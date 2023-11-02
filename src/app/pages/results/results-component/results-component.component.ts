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
  resultsRooms: Room[] = [];
  query: any = {
    minPrice: 0,
    maxPrice: 0,
    typeHouse: '',
    isShareBathroom: false
  };

  constructor( public roomService: RoomService, private cookieService: CookieService) { }

  ngOnInit(): void {
    // Recupera los resultados de búsqueda desde las cookies (si existen)
    const savedSearch = this.cookieService.get('busquedaResultados');
    if (savedSearch) {
      this.roomService.rooms = JSON.parse(savedSearch) as Room[];
      // console.log(this.roomService.rooms);
      this.resultsRooms = [...this.roomService.rooms];
      console.log(this.resultsRooms)

    }
    this.isRoomServiceVoid = this.roomService.roomsIsVoid();
  }

  ngOnDestroy(){
    // this.cookieService.delete('busquedaResultados');
  }

  filterQuery(query: any) {
    console.log("query:",query);
    this.query = query;
    this.resultsRooms = this.roomService.rooms.filter((room) => this.getRoomsFiltered(room));
  }

  getRoomsFiltered = (room: Room) => {
    if (this.query.minPrice > 0 && room.precio < this.query.minPrice) {
      return false; // No cumple con el precio mínimo
    }

    if (this.query.maxPrice > 0 && room.precio > this.query.maxPrice) {
      return false; // No cumple con el precio máximo
    }

    if (this.query.typeHouse && room.casa_depto !== this.query.typeHouse) {
      return false; // No es del tipo de casa seleccionado
    }

    if (this.query.isShareBathroom && !room.banio_compartido) {
      return false; // No tiene baño compartido
    }

    return true; // Cumple con todos los criterios de la query
  };

}


