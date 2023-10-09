import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Booking } from 'src/app/models/booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(public  bookingService: BookingService, private cookieService: CookieService) { }

  ngOnInit(): void {
    const userID = this.cookieService.get('user_id');
    console.log(userID);
    this.bookingService.getBookingByUser(userID).subscribe(
      res => {
        this.bookingService.bookings = res as any;
        console.log(res);
      },
      err => console.log(err)
    )
  }

   

}
