import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-view-info-modal',
  templateUrl: './view-info-modal.component.html',
  styleUrls: ['./view-info-modal.component.css']
})
export class ViewInfoModalComponent implements OnInit {


  constructor(public bookingService: BookingService, public userService : UserService, public roomService:RoomService) { }

  ngOnInit(): void {
  
  }



}
