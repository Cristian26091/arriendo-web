import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Help } from '../models/heelp';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeelpService {

  selectedHelp: Help;
  helps: Help[];

  readonly URL_API = environment.uri+'/api/help'

  constructor(private http: HttpClient) { 
    this.selectedHelp = new Help();
  }

  getHelps(){
    return this.http.get(this.URL_API);
  }

  getHelp(_id: string){
    return this.http.get(this.URL_API+`/${_id}`);
  }
  
}
