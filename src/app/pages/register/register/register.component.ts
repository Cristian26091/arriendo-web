import { Component, OnInit, Output} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SignupService } from 'src/app/services/signup.service';
import { User } from '../../../models/user';
import { InterestService } from 'src/app/services/interest.service';
import { Interest } from 'src/app/models/interest';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  registro: User = new User();
  confirmarPassword: string;
  registrationSuccessMessage: string = ''; // Para mostrar mensaje de éxito
  
  //mensaje de error (cambiar?)
  errorMessages = {
    name: '',
    lastName: '',
    email: '',
    rut: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    gender: '',
    occupation: '',
    activityType: '',
    country: '',
    interests: '',
  };
  //hobbies
  interests!: Interest[];
  //genero
  generos!: string[];
  //ocupacion
  ocupations!: string[];
  //paises
  countrys!: Country[];
  //actividad
  activityTypes!: string[];

  constructor(private userService: UserService, private signupService: SignupService, private interestService: InterestService, private countryService: CountryService) { 
    
  }

  onInterestsChange() {
    const interestNames = this.registro.intereses.map((interest) => interest);
    // console.log(interestNames);
  }

  onCountryChange() {
    // console.log(this.registro.pais);
  }

  async ngOnInit(): Promise<void> {
    await this.getInterests();
    await this.getCountrys();

    this.generos = [
      'Masculino',
      'Femenino',
      'Otro',
    ];

    this.activityTypes = [
      'Estudiante',
      'Trabajador',
      'Jubilado',
      'Otro',
    ];


    this.ocupations = environment.ocupations;
  }

  async getInterests() : Promise<void>{
    try{
      const res = await this.interestService.getInterests().toPromise();
      this.interestService.interests = res as Interest[];
      this.interests = [...this.interestService.interests];
    }catch(err){
      console.log(err);
    }
  }

  async getCountrys() : Promise<void>{
    try{
      const res = await this.countryService.getCountries().toPromise();
      this.countryService.countries = res as Country[];
      this.countrys = [...this.countryService.countries];
    }catch(err){
      console.log(err);
    }
  }

  //---------------- VALIDACIONES----------------
  validateName(): boolean{
    if (!this.registro.nombre) {
      this.errorMessages.name = 'Nombre es un campo obligatorio';
      return false;
    }
    const namePattern = /^[A-Za-záéíóúüÁÉÍÓÚÜñÑ\s]+$/;
    if (!namePattern.test(this.registro.nombre)) {
      this.errorMessages.name = 'Nombre debe contener solo letras y espacios';
      return false;
    }
    this.errorMessages.name = '';
    return true;
  }

  validateLastName(): boolean {
    if (!this.registro.apellido) {
      this.errorMessages.lastName= 'Apellido es un campo obligatorio';
      return false;
    }
    const namePattern = /^[A-Za-záéíóúüÁÉÍÓÚÜñÑ\s]+$/;
    if (!namePattern.test(this.registro.apellido)) {
      this.errorMessages.lastName = 'Apellido debe contener solo letras y espacios';
      return false;
    }
    this.errorMessages.lastName = '';
    return true;
  }

  validateEmail(): boolean {
    if (!this.registro.email) {
      this.errorMessages.email = 'Correo electrónico es un campo obligatorio';
      return false;
    }
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailPattern.test(this.registro.email)) {
      this.errorMessages.email = 'Correo electrónico no válido';
      return false;
    }
    this.errorMessages.email= '';
    return true;
  }

  validateRut(): boolean{
    if (!this.registro.rut) {
      this.errorMessages.rut = 'RUT es un campo obligatorio';
      return false;
    }
    const rutPattern = /^(\d{7,8})-(\d{1}|[kK])$/;
    if (!rutPattern.test(this.registro.rut)) {
      this.errorMessages.rut = 'Formato de RUT no válido';
      return false;
    }
    this.errorMessages.rut = '';
    return true;
  }

  validatePhone(): boolean {
    if (!this.registro.telefono) {
      this.errorMessages.phone = 'Teléfono es un campo obligatorio';
      return false;
    }
    const phonePattern = /^\d{9,12}$/;
    if (!phonePattern.test(this.registro.telefono)) {
      this.errorMessages.phone = 'Teléfono debe contener entre 9 y 12 números';
      return false;
    }
    this.errorMessages.phone = '';
    return true;
  }

  validatePassword() : boolean{
    if (!this.registro.pass) {
      this.errorMessages.password = 'Contraseña es un campo obligatorio';
      return false;
    }
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,15}$/;
    if (!passwordPattern.test(this.registro.pass)) {
      this.errorMessages.password = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número, y tener entre 8 y 15 caracteres';
      return false;
    }
    this.errorMessages.password = '';
    return true;
  }

  validateConfirmPassword() : boolean{
    if (!this.confirmarPassword) {
      this.errorMessages.confirmPassword = 'Confirmar contraseña es un campo obligatorio';
      return false;
    }
    if (this.registro.pass !== this.confirmarPassword) {
      this.errorMessages.confirmPassword = 'Las contraseñas no coinciden';
      return false;
    }
    this.errorMessages.confirmPassword = '';
    return true;
  }

  validateDate() : boolean{
    if (!this.registro.fecha_nacimiento) {
      this.errorMessages.birthdate = 'Fecha de nacimiento es un campo obligatorio';
      return false;
    }
    const dob = new Date(this.registro.fecha_nacimiento);
    const currentYear = new Date().getFullYear();
    if (dob.getFullYear() < 1900 || dob.getFullYear() >= currentYear) {
      this.errorMessages.birthdate = 'Fecha de nacimiento no válida';
      return false;
    }
    this.errorMessages.birthdate = '';
    return true;
  }

  validateGender(): boolean {
    if (!this.registro.genero) {
      this.errorMessages.gender = 'Género es un campo obligatorio';
      return false;
    }
    this.errorMessages.gender = '';
    return true;
  }

  validateOccupation() : boolean{
    if (!this.registro.ocupacion) {
      this.errorMessages.occupation = 'Ocupación es un campo obligatorio';
      return false;
    }
    this.errorMessages.occupation = '';
    return true;
  }

  validateActivityType() : boolean{
    if (!this.registro.tipo_actividad) {
      this.errorMessages.activityType = 'Actividad es un campo obligatorio';
      return false;
    }
    this.errorMessages.activityType = '';
    return true;
  }

  validateCountry() : boolean{
    if (!this.registro.pais) {
      this.errorMessages.country = 'País es un campo obligatorio';
      return false;
    }
    this.errorMessages.country = '';
    return true;
  }

  validateInterests() : boolean{
    if (this.registro.intereses.length === 0) {
      this.errorMessages.interests = 'Debes seleccionar al menos un interés';
      return false;
    }
    this.errorMessages.interests = '';
    return true;
  }

  validateForm(): boolean {
    return this.validateName() &&
      this.validateLastName() &&
      this.validateEmail() &&
      this.validateRut() &&
      this.validatePhone() &&
      this.validatePassword() &&
      this.validateConfirmPassword() &&
      this.validateDate() &&
      this.validateGender() &&
      this.validateOccupation() &&
      this.validateActivityType() &&
      this.validateCountry() &&
      this.validateInterests();
  }

  async onSubmit() {
    this.clearErrorMessage();
    this.clearSuccessMessage();
    // Validar formulario
    if (!this.validateForm()) {
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
        console.log("Error al registrar el usuario!", error);
      }
    );
    
  }

  clearErrorMessage() {
    this.errorMessages.name = '';
    this.errorMessages.lastName = '';
    this.errorMessages.email = '';
    this.errorMessages.rut = '';
    this.errorMessages.phone = '';
    this.errorMessages.password = '';
    this.errorMessages.confirmPassword = '';
    this.errorMessages.birthdate = '';
    this.errorMessages.gender = '';
    this.errorMessages.occupation = '';
    this.errorMessages.activityType = '';
    this.errorMessages.country = '';
    this.errorMessages.interests = '';
  }

  clearForm() {
    this.registro = new User(); // Crea una nueva instancia de User para limpiar el formulario
    this.confirmarPassword = '';
    this.clearErrorMessage();
  }

  clearSuccessMessage() {
    this.registrationSuccessMessage = '';
  }

}
