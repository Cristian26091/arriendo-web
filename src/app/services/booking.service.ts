import { Injectable } from '@angular/core';
import { Booking } from '../models/booking';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  selectedBookin: Booking;
  bookings: Booking[];

  readonly URL_API = environment.uri + '/api/booking';

  constructor(private http: HttpClient) { }

  getBookings() {
    return this.http.get(this.URL_API);
  }

  getBooking(_id: string) {
    return this.http.get(this.URL_API + `/${_id}`);
  }

  postBooking(booking: Booking) {
    return this.http.post(this.URL_API, booking);
  }

  //editar booking
  // putBooking(booking: Booking) {
  //   return this.http.put(this.URL_API + `/${booking._id}`, booking);
  // }

  deleteBooking(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
