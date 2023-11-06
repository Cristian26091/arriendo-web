import { Component, OnInit} from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/room';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mapa: Mapboxgl.Map;

  constructor(public roomService: RoomService, private cookieService : CookieService){}

  async ngOnInit(): Promise<void> {

    if(this.cookieService.check('selectedRoomId')){
      const selectedRoomId = this.cookieService.get('selectedRoomId');
      await this.getRoomByID(selectedRoomId);
      console.log(this.roomService.selectedRoom);
      
      Mapboxgl.accessToken = environment.mapBoxToken;

      this.mapa = new Mapboxgl.Map({
        container: 'mapa_mapbox', // container ID
        style: 'mapbox://styles/mapbox/streets-v10', // style URL
        center: [Number(this.roomService.selectedRoom.latitude), Number(this.roomService.selectedRoom.longitud)], // starting position [Lat, Long]
        zoom: 16 // starting zoom
      });
     
      // Add zoom and rotation controls to the map.
      this.mapa.addControl(new Mapboxgl.NavigationControl());
      await this.crearMarcador();

    }
  }

  async crearMarcador(){
    const marker = new Mapboxgl.Marker({
      draggable: false
    })
      .setLngLat([Number(this.roomService.selectedRoom.latitude), Number(this.roomService.selectedRoom.longitud)])
      .addTo(this.mapa);
  }

  async getRoomByID(id:string){
    try {
      const res = await this.roomService.getRoom(id).toPromise();
      this.roomService.selectedRoom = res as Room;
   
    } catch (error) {
      console.log("Error al obtener la habitación", error);
    }
  }

  

 

}
