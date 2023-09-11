import { Component, OnInit, Output} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SignupService } from 'src/app/services/signup.service';
import { User } from '../../../models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  registro: User = new User();
  confirmarPassword: string;
  registrationSuccessMessage: string = ''; // Para mostrar mensaje de éxito
  errorMessage: string = ''; // Para mostrar mensajes de error
  

  constructor(private userService: UserService, private signupService: SignupService) { 
    
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    // Validar entradas vacias
    if (!this.registro.nombre || !this.registro.apellido || !this.registro.email || !this.registro.pass || !this.confirmarPassword || !this.registro.rut || !this.registro.fecha_nacimiento) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    // Validar formato del nombre y apellido
    const namePattern = /^[A-Za-záéíóúüÁÉÍÓÚÜñÑ\s]+$/;
    if (!namePattern.test(this.registro.nombre) || !namePattern.test(this.registro.apellido)) {
      this.errorMessage = 'Nombre y apellido deben contener solo letras y espacios';
      return;
    }

    // Validar formato del correo electrónico
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailPattern.test(this.registro.email)) {
      this.errorMessage = 'Correo electrónico no válido';
      return;
    }

    // Validar formato del teléfono
    const phonePattern = /^\d{9,12}$/;
    if (!phonePattern.test(this.registro.telefono)) {
      this.errorMessage = 'Teléfono debe contener entre 9 y 12 números';
      return;
    }

    // Validar formato de la contraseña (requiere al menos una mayúscula, una minúscula y un número, y debe tener entre 8 y 15 caracteres)
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,15}$/;
    if (!passwordPattern.test(this.registro.pass)) {
      this.errorMessage = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número, y tener entre 8 y 15 caracteres';
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.registro.pass !== this.confirmarPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    // Validar formato del RUT
    const rutPattern = /^(\d{7,8})-(\d{1}|[kK])$/;
    if (!rutPattern.test(this.registro.rut)) {
      this.errorMessage = 'Formato de RUT no válido';
      return;
    }

    // Validar fecha de nacimiento (puedes ajustar los límites según tus necesidades)
    const dob = new Date(this.registro.fecha_nacimiento);
    const currentYear = new Date().getFullYear();
    if (dob.getFullYear() < 1900 || dob.getFullYear() > currentYear) {
      this.errorMessage = 'Fecha de nacimiento no válida';
      return;
    }

    // Realizar registro
    this.userService.postUser(this.registro).subscribe(
      (response) => {
        // Cuando el registro sea exitoso
        this.registrationSuccessMessage = 'Registro exitoso. Por favor, inicia sesión.';
        this.signupService.signupSuccess();
        this.clearForm();

      },
      (error) => {
        this.errorMessage = error.error.message;
        // Maneja los errores de registro de acuerdo a tus necesidades
      }
    );
    
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  clearForm() {
    this.registro = new User(); // Crea una nueva instancia de User para limpiar el formulario
    this.confirmarPassword = '';
    this.errorMessage = '';
  }

  clearSuccessMessage() {
    this.registrationSuccessMessage = '';
  }

}
