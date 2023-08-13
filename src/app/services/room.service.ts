import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Room } from '../models/room';
import { Observable } from 'rxjs';
import { Region } from '../models/region.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  selectedRoom: Room;
  rooms: Room[];

  readonly URL_API = environment.uri+'/api'

  constructor(private http: HttpClient){
    
    this.selectedRoom = new Room();
    this.rooms = [];

  }

  getRooms(){
    return this.http.get(this.URL_API);
  }

  getRoom(_id: string){
    return this.http.get(this.URL_API+`/${_id}`);
  }

  getRoomByFilter (req: any): Observable<any[]>{
    let params = {
      region: "",
      comuna: "",
      casa_depto: "",
    };
    // if (req.disponible !== undefined && req.disponible !== true) {
    //   params += `esta_arrendado=${req.disponible}&`;
    // }
    if (req.region !== undefined) {
      params.region = req.region;
    }
    if (req.comuna !== undefined) {
      params.comuna = req.comuna;
    }
    if (req.casa_depto !== undefined) {
      params.casa_depto = req.casa_depto;
    }
    // console.log("Imprimir query:", params);

    return this.http.get<any[]>(`${this.URL_API}/filterRooms/`, { params });
  
  }

  postRoom(room: Room){
   
  }

  putRoom(room: Room){
    
  }

  deleteRoom(_id : string){
    
  }

  roomsIsVoid(){
    return this.rooms.length === 0;
  }

}
