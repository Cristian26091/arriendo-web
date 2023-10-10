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
  
  constructor(public userService: UserService) { 
    this.headTableContent = ["Nombre", "Email", "Telefono", "Rut", "Acción"];
    this.getUsers();
  }

  ngOnInit(): void {
  }

  getUsers(){
    this.userService.getUsers()
      .subscribe( res =>{
        this.userService.users = res as User[];
    });
  }

  editarItem(item){
    console.log(item);
  }

  deleteUser(){
    if (this.userService.selectedUser) {
      // No hay habitación seleccionada, no se puede eliminar
      this.userService.deleteUser(this.userService.selectedUser._id)
      .subscribe(() => {
        // La habitación se eliminó correctamente, puedes actualizar la lista de habitaciones si es necesario.
        this.getUsers(); // Otra vez, obtén las habitaciones actualizadas.
        // Cierra el modal de confirmación de eliminación
        // $('#confirmDeleteModal').modal('hide');
      });
    }
    return;
  }

  selectToDelete(item:User){
    this.userService.selectedUser = item;
  }

}
