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
  casa: House = new House();
  errors: { [key: string]: string } = {};
  

  constructor(public houseService : HouseService) { }

  ngOnInit(): void {
    
  }

  onchange(){
    console.log(this.house);
  }

  validateFechaTermino():  boolean {
    this.clearErrors();

    if(!this.casa.fecha_termino){
      this.errors['fechaTermino'] = "Debes ingresar una fecha de término para la publicación";
      return false;
    }

    const currentDate = new Date();
    const selectedDate = new Date(this.casa.fecha_termino);

    if (selectedDate <= currentDate) {
      this.errors['fechaTermino'] = "La fecha de término debe ser posterior a la fecha actual";
      return false;
    }

    return true;
  }

  validatePrecio(): boolean {
    this.clearErrors();

    if(this.casa.precio == ''){
      this.errors['precio'] = "Debes ingresar un precio para la publicación";
      return false;
    }

    // Utilizar una expresión regular para verificar si el precio contiene solo números
    const numberPattern = /^\d+$/;
    if (!numberPattern.test(this.casa.precio.toString())) {
      this.errors['precio'] = "El precio debe contener solo números";
      return false;
    }
    return true;

  }

  validateNameDuenio(): boolean {
    this.clearErrors();

    if(this.casa.duenio == ''){
      this.errors['nameDuenio'] = "Debes ingresar un nombre de dueño para la publicación";
      return false;
    }

    // Utilizar una expresión regular para verificar si el nombre del dueño contiene solo palabras
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(this.casa.duenio.toString())) {
      this.errors['nameDuenio'] = "El nombre del dueño debe contener solo letras y espacios";
      return false;
    }
    return true;
  }

  validateForm() {
    return this.validateFechaTermino() && this.validatePrecio() && this.validateNameDuenio();
  }

  clearErrors() {
    this.errors = {};
  }


  editHouse(){
    this.houseService.editHouse(this.casa).subscribe(response => {
      console.log('Casa editada con éxito', response);
    });
  }

  // Función para formatear la fecha en "DD-MM-YYYY" a "YYYY-MM-DD"
  formatFechaTermino(dateString: string): string {
  const parts = dateString.split('-'); // Divide la cadena en partes utilizando el guion como separador
    if (parts.length === 3) {
      // Verifica si la cadena tiene tres partes (día, mes, año)
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      
      // Formatea la fecha como "YYYY-MM-DD"
      return `${year}-${month}-${day}`;
    } else {
      // Si la cadena no tiene tres partes, devuelve la cadena original
      return dateString;
    }
}

  onSubmit(){

    //validar formulario
    if(this.validateForm()){
      console.log(this.casa); 

      if (this.houseService.selectedHouse) {
        this.editHouse(); // En modo de edición
      }

      //limpia el formulario
      this.casa = new House();
    }
    return;
  }
}
