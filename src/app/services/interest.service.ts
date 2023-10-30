import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable  } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Interest } from '../models/interest';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  interests: Interest[] = [];

  readonly URL_API_HOUSE = environment.uri+'/api/interest'


  constructor( private http: HttpClient) { }

  getInterests(){
    return this.http.get(`${this.URL_API_HOUSE}`);
  }
}
