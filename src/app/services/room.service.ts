import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  selectedRoom: Room;
  rooms: Room[];

  readonly URL_API = 'http://127.0.0.1:3000/api/room'

  constructor(private http: HttpClient){
    
    this.selectedRoom = new Room();

  }

  getRooms(){
    return this.http.get(this.URL_API);
  }

  getRoom(_id: string){
    return this.http.get(this.URL_API+`/${_id}`);
  }

  postRoom(room: Room){
   
  }

  putRoom(room: Room){
    
  }

  deleteRoom(_id : string){
    
  }

}
