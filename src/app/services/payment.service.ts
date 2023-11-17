import { Injectable } from '@angular/core';

import { Service } from '../models/service';
import { ServiceService } from './service.service';

import { Room } from '../models/room';
import { RoomService } from './room.service';

import { User } from '../models/user';
import { UserService } from './user.service';

import { Observable } from 'rxjs';
import { Booking } from '../models/booking';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  user$: User = new User();
  room$: Room = new Room();
  booking$: Booking = new Booking();
  selectedServices$: string[] = [];
  horaLLegada: string = '';
  
  selectedPaymentMethod: string = '';
  totalPrice: number = 0;
  date: string = '';

  constructor(private serviceService: ServiceService, private userService : UserService, private roomService : RoomService) { 


  }
}
