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

  toggleServiceSelection(service: Service) {
    if (this.selectedServices.includes(service._id)) {
      // Si el servicio ya está seleccionado, quitarlo de la lista de selección
      this.selectedServices = this.selectedServices.filter(id => id !== service._id);
      this.paymentService.selectedServices$ = this.paymentService.selectedServices$.filter(servicio => servicio._id !== service._id);
      console.log("payment servicio selecionado:",this.paymentService.selectedServices$);
      // console.log(this.selectedServices);
    } else {
      // Si el servicio no está seleccionado, añadirlo a la lista de selección
      this.selectedServices.push(service._id);
      this.paymentService.selectedServices$.push(service);
      // console.log(this.paymentService.selectedServices$);
      console.log("payment servicio selecionado:",this.paymentService.selectedServices$);
    }
  }

  // Función para verificar si un servicio está seleccionado
  isServiceSelected(servicio : Service): boolean {
    return this.selectedServices.includes(servicio._id);
  }

}
