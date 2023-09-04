import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registro: User = new User();
  confirmarPassword: string;
  errorMessage: string = ''; // Para mostrar mensajes de error


  constructor(private userService: UserService) { 
    
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    // Validar entradas vacias
    if (!this.registro.nombre || !this.registro.apellido || !this.registro.email || !this.registro.pass || !this.confirmarPassword || !this.registro.rut || !this.registro.fecha_nacimiento) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }
    // Validar que las contraseñas coincidan
    if (this.registro.pass !== this.confirmarPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }
    
    // Verificar si el correo ya está registrado
    const emailExists = await this.userService.checkEmailExistence(this.registro.email).toPromise();
    if (emailExists) {
      this.errorMessage = 'El correo ya está registrado';
      return;
    }

    // Verificar si el RUT ya está registrado
    const rutExists = await this.userService.checkRutExistence(this.registro.rut).toPromise();
    if (rutExists) {
      this.errorMessage = 'El RUT ya está registrado';
      return;
    }


    // Realizar registro
    this.userService.postUser(this.registro).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito', response);
        // Realiza acciones adicionales después del registro si es necesario
      },
      (error) => {
        console.error('Error al registrar usuario', error);
        // Maneja los errores de registro de acuerdo a tus necesidades
      }
    );
    
  }

}
