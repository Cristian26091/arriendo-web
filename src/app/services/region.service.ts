import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region } from '../models/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  selectedRegion: Region;
  regions: Region[];

  readonly URL_API = 'http://127.0.0.1:3000/api/region'

  constructor(private http: HttpClient) {

    this.selectedRegion = new Region();

  } 

  getRegions(){
    return this.http.get(this.URL_API);
  }

  getRegion(_id: string){
    return this.http.get(this.URL_API+`/${_id}`);
  }

  postRegion(region: Region){

  }

  putRegion(region: Region){

  }

  deleteRegion(_id : string){

  }

}
