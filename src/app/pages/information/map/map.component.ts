import { Component, AfterViewInit,OnInit} from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit {

  mapa: Mapboxgl.Map;

  constructor(public roomService: RoomService){}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    Mapboxgl.accessToken = environment.mapBoxToken;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa_mapbox', // container ID
      style: 'mapbox://styles/mapbox/streets-v10', // style URL
      center: [Number(this.roomService.selectedRoom.latitude), Number(this.roomService.selectedRoom.longitud)], // starting position [Lat, Long]
      zoom: 16 // starting zoom
    });
     
    // Add zoom and rotation controls to the map.
    this.mapa.addControl(new Mapboxgl.NavigationControl());
    this.crearMarcador(Number(this.roomService.selectedRoom.latitude),  Number(this.roomService.selectedRoom.longitud));
  }

  crearMarcador(lng: Number, lat: Number){
    const marker = new Mapboxgl.Marker({
      draggable: false
    })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
  }

  

 

}
