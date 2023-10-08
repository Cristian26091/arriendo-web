import { Injectable } from '@angular/core';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  selectedBookin: Booking;
  bookings: Booking[];

  constructor() { }
}
