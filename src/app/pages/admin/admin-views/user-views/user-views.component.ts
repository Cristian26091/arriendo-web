import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-views',
  templateUrl: './user-views.component.html',
  styleUrls: ['./user-views.component.css']
})
export class UserViewsComponent implements OnInit {
  currentRoute: string = "";
  currentRouteParts: string[] = ["primero", "segundo"];
  headTableContent: string[];
  
  constructor(public UserService: UserService) { 
    this.headTableContent = ["Nombre", "Email", "Telefono", "Rut", "Acción"];
    this.getUsers();
    // console.log(this.UserService.users);
  }

  ngOnInit(): void {
  }

  getUsers(){
    this.UserService.getUsers()
      .subscribe( res =>{
        this.UserService.users = res as User[];
    });
  }

  editarItem(item){
    console.log(item);
  }

  eliminarItem(item){
    console.log(item);
  }

}
