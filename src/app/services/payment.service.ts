import { Injectable } from '@angular/core';
import { Service } from '../models/service';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  selectedServices: string[] = [];

  constructor(private ServiceService : ServiceService) { }
}
