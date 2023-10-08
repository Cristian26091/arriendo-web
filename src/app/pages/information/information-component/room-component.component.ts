import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import { LoginService } from 'src/app/services/login.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-room-component',
  templateUrl: './room-component.component.html',
  styleUrls: ['./room-component.component.css']
})
export class RoomComponentComponent implements OnInit {

 
  showLoginForm = false;
  showSuccessAlert = false;

  constructor(private activaterouter: ActivatedRoute, private router: Router, 
  public roomService: RoomService, public loginService: LoginService, private cookieService: CookieService) { }

  ngOnInit(): void {
    // Obtén el ID de la habitación seleccionada desde la cookie
    const selectedRoomId = this.cookieService.get('selectedRoomId');
    // Si se encuentra el ID en la cookie, carga la habitación correspondiente
    if (selectedRoomId) {
      this.getRoom(selectedRoomId);
    }
  }

  //aqui debo traer el room
  getRoom(id: string){
    this.roomService.getRoom(id)
    .subscribe(res =>{
      this.roomService.selectedRoom = res as Room;
    });
  }

  toggleForms(){
    this.showLoginForm = !this.showLoginForm;
  }

}
