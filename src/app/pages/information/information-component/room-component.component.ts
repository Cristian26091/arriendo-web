import { Component, OnInit, OnDestroy } from '@angular/core';
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
    this.roomService.getRoom(selectedRoomId)
      .subscribe((res: Room) => {
        // Asigna los datos de la habitación una vez que se completa la solicitud HTTP
        this.roomService.selectedRoom = res as Room;
      });
    }
  }

  ngOnDestroy(): void{
    // Elimina el ID de la habitación seleccionada de la cookie
    this.cookieService.delete('selectedRoomId');
  }

  toggleForms(){
    this.showLoginForm = !this.showLoginForm;
  }

}
