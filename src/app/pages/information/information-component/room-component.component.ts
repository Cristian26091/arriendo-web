import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-room-component',
  templateUrl: './room-component.component.html',
  styleUrls: ['./room-component.component.css']
})
export class RoomComponentComponent implements OnInit {

  room: Room = null;
  showLoginForm = false;
  showSuccessAlert = false;

  constructor(private activaterouter: ActivatedRoute, private router: Router, 
  public roomService: RoomService, public loginService: LoginService) { }

  ngOnInit(): void {
    let pacienteId = this.activaterouter.snapshot.paramMap.get('id');
    this.getRoom(pacienteId);
  }

  //aqui debo traer el room
  getRoom(id: string){
    this.roomService.getRoom(id)
    .subscribe(res =>{
      this.room = res as Room;
      //console.log(res);
    });
  }

  reserveRoom(){
    console.log("hola")
    this.router.navigate(['/payment']);
  }

  toggleForms(){
    this.showLoginForm = !this.showLoginForm;
  }

}
