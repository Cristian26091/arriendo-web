import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { House } from 'src/app/models/house';
import { DatePipe } from '@angular/common';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-edit-form-house',
  templateUrl: './edit-form-house.component.html',
  styleUrls: ['./edit-form-house.component.css']
})
export class EditFormHouseComponent implements OnInit {

  @Input() house: House;
  @Input() fechaTermino: string;

  errors: { [key: string]: string } = {};
  

  constructor(public houseService : HouseService) { }

  ngOnInit(): void {
  }



  validateFechaTermino():  boolean {
    this.clearErrors();

    if(!this.house.fecha_termino){
      this.errors['fechaTermino'] = "Debes ingresar una fecha de término para la publicación";
      return false;
    }

    const currentDate = new Date();
    const selectedDate = new Date(this.house.fecha_termino);

    if (selectedDate <= currentDate) {
      this.errors['fechaTermino'] = "La fecha de término debe ser posterior a la fecha actual";
      return false;
    }

    return true;
  }

  formateDate(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  validatePrecio(): boolean {
    this.clearErrors();

    if(this.house.precio == ''){
      this.errors['precio'] = "Debes ingresar un precio para la publicación";
      return false;
    }

    // Utilizar una expresión regular para verificar si el precio contiene solo números
    const numberPattern = /^\d+$/;
    if (!numberPattern.test(this.house.precio.toString())) {
      this.errors['precio'] = "El precio debe contener solo números";
      return false;
    }
    return true;

  }

  validateNameDuenio(): boolean {
    this.clearErrors();

    if(this.house.duenio == ''){
      this.errors['nameDuenio'] = "Debes ingresar un nombre de dueño para la publicación";
      return false;
    }

    // Utilizar una expresión regular para verificar si el nombre del dueño contiene solo palabras
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(this.house.duenio.toString())) {
      this.errors['nameDuenio'] = "El nombre del dueño debe contener solo letras y espacios";
      return false;
    }
    return true;
  }

  validateNamePropiedad(): boolean {
    this.clearErrors();

    if(this.house.nombrePropiedad == ''){
      this.errors['namePropiedad'] = "Debes ingresar un nombre de propiedad para la publicación";
      return false;
    }

    // Utilizar una expresión regular para verificar si el nombre de la propiedad contiene solo palabras
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(this.house.nombrePropiedad.toString())) {
      this.errors['namePropiedad'] = "El nombre de la propiedad debe contener solo letras y espacios";
      return false;
    }
    return true;
  }

  validateNumPisos(): boolean {
    this.clearErrors();

    if(this.house.numPisos == null){
      this.errors['numPisos'] = "Debes ingresar un número de pisos para la publicación";
      return false;
    }

    const number = new Number(this.house.numPisos); 
    if(number.valueOf() <= 0){
      console.log("cacacaaaaa");
      this.errors['numPisos'] = "El número de pisos debe ser mayor a 0";
      return false;
    }

    // Utilizar una expresión regular para verificar si el número de pisos contiene solo números
    const numberPattern = /^\d+$/;
    if (!numberPattern.test(this.house.numPisos.toString())) {
      this.errors['numPisos'] = "El número de pisos debe contener solo números";
      return false;
    }

    return true;

  }

  validateForm() {
    return this.validateFechaTermino() && this.validatePrecio() && this.validateNameDuenio() && this.validateNamePropiedad() && this.validateNumPisos();
  }

  clearErrors() {
    this.errors = {};
  }


  editHouse(){
    this.houseService.editHouse(this.house).subscribe(response => {
      console.log('Casa editada con éxito', response);
    });
  }

  onSubmit(){

    //validar formulario
    if(this.validateForm()){

      if (this.houseService.selectedHouse) {
        this.editHouse(); // En modo de edición
      }

      //limpia el formulario
      this.house = new House();
    }
    return;
  }
}
