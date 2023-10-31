import { Injectable } from '@angular/core';
import { Booking } from '../models/booking';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  selectedBookin: Booking;
  bookings: Booking[];

  readonly URL_API = environment.uri + '/api/booking';

  constructor(private http: HttpClient) {
    this.bookings = []
  }

  getBookings() {
    return this.http.get(this.URL_API);
  }

  getBooking(_id: string): Observable<any>{
    return this.http.get(this.URL_API + `/${_id}`);
  }

  getBookingByUser(_id: string) {
    console.log(_id);
    return this.http.get(this.URL_API + `/user/${_id}`);
  }

  getBookingByRoom(_id: string) {
    console.log(_id);
    return this.http.get(this.URL_API + `/room/${_id}`);
  }

  postBooking(booking: Booking) {
    return this.http.post(this.URL_API, booking);
  }

  putBooking(booking: Booking): Observable<any>{
    return this.http.put(this.URL_API, booking);
  }

  deleteBooking(_id: string): Observable<any>{
    // console.log(_id);
    // console.log(this.URL_API + `/${_id}`);
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
