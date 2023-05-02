import { Component} from '@angular/core';
import { Room } from 'src/app/models/room';
import { RoomService } from '../../services/room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results-component',
  templateUrl: './results-component.component.html',
  styleUrls: ['./results-component.component.css']
})
export class ResultsComponentComponent {

  region: string;
  comuna: string;
  tipoVivienda: string;
  rooms: any[] = [];

  constructor( public roomService: RoomService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    // Obtener los parámetros de la URL
    this.activatedRoute.params.subscribe(params => {
      this.region = params['region'];
      this.comuna = params['comuna'];
      this.tipoVivienda = params['tipoVivienda'];

      // Llamar al servicio para obtener las habitaciones filtradas
      this.roomService.getRoomByFilter({region: this.region, comuna: this.comuna, tipoVivienda: this.tipoVivienda}).subscribe(res => {
        this.rooms = res;
      });
    });
  }

  getRooms(){
    this.roomService.getRooms()
      .subscribe( res =>{
        this.roomService.rooms = res as Room[];
        console.log(res);
    });
  }

  getRoomsByFilter(region: string, comuna: string, casa_depto: string) {
    const req = {
      region: region,
      comuna: comuna,
      casa_depto: casa_depto
    }
    this.roomService.getRoomByFilter(req)
      .subscribe(res => {
        this.roomService.rooms = res as Room[];
        console.log(res);
      });
  }

}


