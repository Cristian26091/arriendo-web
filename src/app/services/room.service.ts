import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Room } from '../models/room';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  selectedRoom: Room;
  rooms: Room[];

  readonly URL_API = environment.uri+'/api/room'
  readonly URL_FILTER_ROOM = environment.uri+'/api'
  readonly URL_UPLOAD_MODEL = environment.uri + '/api/uploadModel';

  constructor(private http: HttpClient){
    
    this.selectedRoom = new Room();
    this.rooms = [];

  }

  //función para subir el modelo 3D
  uploadModelFile(file: File): Observable<any> {
    // console.log('Archivo:', file);
    const formData = new FormData();
    formData.append('model', file);
    return this.http.post(this.URL_UPLOAD_MODEL, formData);
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

    return this.http.get<any[]>(`${this.URL_FILTER_ROOM}/filterRooms/`, { params });
  
  }

  postRoom(room: Room): Observable<any> {
    return this.http.post(`${this.URL_API}`, room);
  }

  putRoom(room: Room){
    
  }

  deleteRoom(_id: string): Observable<any> {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }

  roomsIsVoid(){
    return this.rooms.length === 0;
  }

}
