import { Component, OnInit } from '@angular/core';
import { House } from 'src/app/models/house';
import { DatePipe } from '@angular/common';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-add-form-house',
  templateUrl: './add-form-house.component.html',
  styleUrls: ['./add-form-house.component.css']
})
export class AddFormHouseComponent implements OnInit {

  casa: House = new House();
  formattedFechaPublicacion: string;

  errors: { [key: string]: string } = {};


  constructor(private houseService: HouseService) { }

  ngOnInit(): void {
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

  createHouse() {
    this.houseService.postHouse(this.casa).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

  onSubmit() {

    //validar formulario
    if(this.validateForm()){
      this.casa.fecha_publicacion = new Date();
      console.log(this.casa); 

      //crear la casa
      this.createHouse();

      //limpia el formulario
      this.casa = new House();
    }
    return;
  }

 
  

}
