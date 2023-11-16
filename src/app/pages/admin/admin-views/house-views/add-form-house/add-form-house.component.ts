import { Component, OnInit } from '@angular/core';
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/services/house.service';
import { Region } from 'src/app/models/region.model';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-add-form-house',
  templateUrl: './add-form-house.component.html',
  styleUrls: ['./add-form-house.component.css']
})
export class AddFormHouseComponent implements OnInit {

  casa: House = new House();
  formattedFechaPublicacion: string;

  comunasOptions: string[];

  errors: { [key: string]: string } = {};


  constructor(private houseService: HouseService, public regionService : RegionService) { }

  async ngOnInit(): Promise<void> {
    this.getRegions();
  }

  async getRegions(){
    try {
      const res = await this.regionService.getRegions().toPromise();
      this.regionService.regions = res as Region[];
    } catch (err) {
      console.log(err);
    }
  }

  onRegionSelected(event: any){
    
    console.log(event.target.value);
    this.casa.region = event.target.value;//obtengo el nombre de la region seleccionada
    const region = this.regionService.regions.find(r => r.nombre_region === this.casa.region);
    
    if (region) {
      this.comunasOptions = region.comunas.map((c) => c.nombre_comuna);
    } else {
      this.comunasOptions = [];
    }
  }

  onComunaSelected(event: any){
    console.log(event.target.value);
    // this.selectedComuna = event.target.value; 
  }

  // ------------------ VALIDACIONES ----------------------------------

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

  validateNamePropiedad(): boolean {
    this.clearErrors();

    if(this.casa.nombrePropiedad == ''){
      this.errors['namePropiedad'] = "Debes ingresar un nombre de propiedad para la publicación";
      return false;
    }

    // Utilizar una expresión regular para verificar si el nombre de la propiedad contiene solo palabras
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(this.casa.nombrePropiedad.toString())) {
      this.errors['namePropiedad'] = "El nombre de la propiedad debe contener solo letras y espacios";
      return false;
    }
    return true;
  }

  validateNumHabitaciones(): boolean{
    this.clearErrors();
    if(this.casa.numHabitaciones == null){
      this.errors['numHabitaciones'] = "Debes ingresar un número de habitaciones para la casa";
      return false;
    }

    const number = new Number(this.casa.numHabitaciones); 
    if(number.valueOf() <= 0){
      this.errors['numHabitaciones'] = "El número de habitaicones debe ser mayor a 0";
      return false;
    }

    // Utilizar una expresión regular para verificar si el número de pisos contiene solo números
    const numberPattern = /^\d+$/;
    if (!numberPattern.test(this.casa.numHabitaciones.toString())) {
      this.errors['numHabitaciones'] = "El número de habitaciones debe contener solo números";
      return false;
    }

    return true;
  }

  validateNumBanios(): boolean{
    this.clearErrors();
    if(this.casa.numBanios == null){
      this.errors['numBanios'] = "Debes ingresar un número de pisos para la publicación";
      return false;
    }

    const number = new Number(this.casa.numBanios); 
    if(number.valueOf() <= 0){
      this.errors['numBanios'] = "El número de baños debe ser mayor a 0";
      return false;
    }

    // Utilizar una expresión regular para verificar si el número de pisos contiene solo números
    const numberPattern = /^\d+$/;
    if (!numberPattern.test(this.casa.numBanios.toString())) {
      this.errors['numBanios'] = "El número de baños debe contener solo números";
      return false;
    }

    return true;
  }

  validateEstacionamiento(): boolean{
    this.clearErrors();
    if(this.casa.tieneEstacionamiento == null){
      this.errors['estacionamiento'] = "Debes ingresar si la casa tiene estacionamiento o no";
      return false;
    }

    return true;
  }

  validateCalle(): boolean{
    this.clearErrors();
    if(this.casa.calle == ''){
      this.errors['calle'] = "Debes ingresar una calle para la casa";
      return false;
    }

    // Utilizar una expresión regular para verificar si el nombre de la calle contiene solo palabras
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(this.casa.calle.toString())) {
      this.errors['calle'] = "El nombre de la calle debe contener solo letras y espacios";
      return false;
    }
    return true;
  }

  validateRegion(): boolean{
    this.clearErrors();
    if(this.casa.region == ''){
      this.errors['region'] = "Debes ingresar una región para la casa";
      return false;
    }
    return true;
  }

  validateComuna(): boolean{
    this.clearErrors();
    if(this.casa.comuna == ''){
      this.errors['comuna'] = "Debes ingresar una comuna para la casa";
      return false;
    }
    return true;
  }

  validateForm() {
    return this.validateFechaTermino() 
    && this.validatePrecio() 
    && this.validateNameDuenio() 
    && this.validateNamePropiedad() 
    && this.validateCalle()
    && this.validateNumHabitaciones()
    && this.validateNumBanios()
    && this.validateEstacionamiento()
    && this.validateRegion()
    && this.validateComuna();
  }

  clearErrors() {
    this.errors = {};
  }

  getHouses() {
    this.houseService.getHouses().subscribe(
      (res) => {
        this.houseService.houses = res as House[];
      },
      (err) => console.log(err)
    );
  }

  createHouse() {
    this.houseService.postHouse(this.casa).subscribe(
      (res) => {
        console.log(res);
        this.getHouses();
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
