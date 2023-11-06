import { Injectable } from '@angular/core';
import { House } from '../models/house';
import { environment } from '../../environments/environment';
import { Observable  } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  selectedHouse: House = new House();
  houses: House[] = [];
  
  readonly URL_API_HOUSE = environment.uri+'/api/house'


  constructor(private http: HttpClient) { }

  getHouses(){
    return this.http.get(`${this.URL_API_HOUSE}`);
  }

  getHouse(_id: string){
    return this.http.get(`${this.URL_API_HOUSE}/${_id}`);
  }

  postHouse(house: House):Observable<any>{
    return this.http.post(`${this.URL_API_HOUSE}`, house);
  }

  deleteHouse(_id: string){
    return this.http.delete(`${this.URL_API_HOUSE}/${_id}`);
  }

  editHouse(house: House){
    return this.http.put(`${this.URL_API_HOUSE}/${house._id}`, house);
  }

}
