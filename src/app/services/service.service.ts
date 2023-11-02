import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../models/service';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  selectedService: Service;
  services: Service[];

  readonly URL_API = environment.uri+'/api/service'

  constructor(private htttp : HttpClient) { }

  getServices(){
    return this.htttp.get(this.URL_API);
  }

  getService(_id: string): Observable<Service>{
    return this.htttp.get<Service>(`${this.URL_API}/${_id}`);
  }
}
