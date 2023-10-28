import { Component, OnInit , Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.css']
})
export class FilterResultComponent implements OnInit {

  @Output() queryFilterEvent = new EventEmitter<string>();

  selectedMinPrice: number = 0; // Establece el valor mínimo seleccionado
  selectedMaxPrice: number = 0; // Establece el valor máximo seleccionado

  selectedTypeHouse: string = ''; // Establece el tipo de casa seleccionado

  isShareBathroom: boolean = false; // Establece si el baño es compartido o no

  errorMinPrice: string = ''; // Establece el mensaje de error para el valor mínimo
  erroMaxPrice: string = ''; // Establece el mensaje de error para el valor máximo

  constructor() { 

  }

  ngOnInit(): void {
    
  }

  applyFilter() {
    // Limpia los mensajes de error al principio de la validación
    this.errorMinPrice = '';
    this.erroMaxPrice = '';

    // Verifica si se encontraron errores y detiene el procesamiento si es necesario
    if (!this.validateMaxPrice() || !this.validateMinPrice()) {
      return; // Detener la función si hay errores
    }

    // Filtra las habitaciones
    this.filterRooms();

  }

  filterRooms() {
    const params = {
      minPrice: this.selectedMinPrice,
      maxPrice: this.selectedMaxPrice,
      typeHouse: this.selectedTypeHouse,
      isShareBathroom: this.isShareBathroom
    }
    this.emitParams(params);
  }

  emitParams(value: any) {
    this.queryFilterEvent.emit(value);
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }

  validateMinPrice(): boolean{
    if(this.selectedMinPrice > this.selectedMaxPrice){
      this.errorMinPrice = 'Valor minimo invalido';
      return false;
    }
    return true;
  } 

  validateMaxPrice(){
    if(this.selectedMaxPrice < this.selectedMinPrice){
      this.erroMaxPrice = 'Valor máximo invalido';
      return false;
    }
    return true;
  }

}
