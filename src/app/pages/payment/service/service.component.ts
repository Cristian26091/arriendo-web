import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  services: Service[] = [];
  selectedServices: string[] = [];

  constructor(private serviceService : ServiceService, private paymentService : PaymentService) { }

  async ngOnInit(): Promise<void> {
    await this.getServices();
    // console.log(this.serviceService.services);
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
      // console.log(res);
    } catch (error) {
      // console.log("Error al obtener el servicio", error);
    }
  }

  toggleServiceSelection(serviceId: string) {
    if (this.selectedServices.includes(serviceId)) {
      // Si el servicio ya está seleccionado, quitarlo de la lista de selección
      this.selectedServices = this.selectedServices.filter(id => id !== serviceId);
      console.log(this.selectedServices);
    } else {
      // Si el servicio no está seleccionado, añadirlo a la lista de selección
      this.selectedServices.push(serviceId);
      console.log(this.selectedServices);
    }
  }

  // Función para verificar si un servicio está seleccionado
  isServiceSelected(serviceId: string): boolean {
    return this.selectedServices.includes(serviceId);
  }

}
