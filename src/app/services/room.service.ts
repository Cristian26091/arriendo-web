import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Room } from '../models/room';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  selectedRoom: Room;
  rooms: Room[];

  readonly URL_API = 'http://127.0.0.1:3000/api'

  constructor(private http: HttpClient){
    
    this.selectedRoom = new Room();

  }

  getRooms(){
    return this.http.get(this.URL_API);
  }

  getRoom(_id: string){
    return this.http.get(this.URL_API+`/${_id}`);
  }

  getRoomByFilter (req: any): Observable<any[]>{
    console.log("Room service:",req);
    let params = {
      region: "",
      comuna: ""
    };
    // if (req.disponible !== undefined && req.disponible !== true) {
    //   params += `disponible=${req.disponible}&`;
    // }
    if (req.region !== undefined) {
      params.region = req.region;
    }
    if (req.comuna !== undefined) {
      params.comuna = req.comuna;
    }
    // if (req.casa_depto !== undefined) {
    //   params += `/${req.tipoVivienda}`;
    // }
    console.log("Imprimir query:", params);
    return this.http.get<any[]>(`${this.URL_API}/filterRooms/`, { params });
  
  }

  postRoom(room: Room){
   
  }

  putRoom(room: Room){
    
  }

  deleteRoom(_id : string){
    
  }

}
