import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  services: Service[] = [];

  constructor(private serviceService : ServiceService) { }

  async ngOnInit(): Promise<void> {
    await this.getServices();
    console.log(this.serviceService.services);

  }

  async getServices(){
    try {
      const res = await this.serviceService.getServices().toPromise();
      this.serviceService.services = res as Service[];
      this.services = [...this.serviceService.services];
    } catch (error) {
      console.log("Error al obtener los servicios", error);
    }
  }

  async getService(_id: string){
    try {
      const res = await this.serviceService.getService(_id).toPromise();
      this.serviceService.selectedService = res as Service;
      console.log(res);
    } catch (error) {
      console.log("Error al obtener el servicio", error);
    }
  }

  selectService(_id: string) {
    this.getService(_id); // Llama a la función para obtener el servicio seleccionado
  }



}
