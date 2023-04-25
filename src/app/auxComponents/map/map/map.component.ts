import { Component, AfterViewInit,OnInit, Input} from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { RoomService } from 'src/app/services/room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit {

  mapa: Mapboxgl.Map;
  longitud: Number = 0;
  latitud: Number = 0;

  constructor(private activaterouter: ActivatedRoute, public roomService: RoomService){
  }

  ngOnInit(): void {
    //console.log("caca");
    this.latitud = Number(this.roomService.selectedRoom.latitud);
    this.longitud = Number(this.roomService.selectedRoom.longitud);

    // console.log(typeof(this.latitud));
    // console.log(typeof(this.longitud));
  }

  ngAfterViewInit(): void {
    //console.log(this.roomService.selectedRoom);
    Mapboxgl.accessToken = environment.mapBoxToken;

    // console.log(this.latitud);
    // console.log(this.longitud);

    this.mapa = new Mapboxgl.Map({
      container: 'mapa_mapbox', // container ID
      style: 'mapbox://styles/mapbox/streets-v10', // style URL
      center: [this.latitud, this.longitud], // starting position [Lat, Long]
      zoom: 16 // starting zoom
    });
     
    // Add zoom and rotation controls to the map.
    this.mapa.addControl(new Mapboxgl.NavigationControl());
    this.crearMarcador(this.latitud, this.longitud);
  }

  crearMarcador(lng: Number, lat: Number){
    const marker = new Mapboxgl.Marker({
      draggable: false
    })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
  }

 

}
