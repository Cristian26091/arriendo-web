import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  countries: Country[] = [];

  constructor(private http : HttpClient) { }

  readonly URL_API_COUNTRY = environment.uri+'/api/country'

  getCountries(){
    return this.http.get(`${this.URL_API_COUNTRY}`);
  }
}
