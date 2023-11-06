import { Component, OnInit } from '@angular/core';
import { House } from '../../../../../models/house';
import { HouseService } from '../../../../../services/house.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-houseview',
  templateUrl: './houseview.component.html',
  styleUrls: ['./houseview.component.css']
})
export class HouseviewComponent implements OnInit {

  currentRouteParts: string[] = ["primero", "segundo"];
  headTableContent: string[];

  constructor( public houseService: HouseService ) { }

  ngOnInit(): void {
    this.headTableContent = ["ID", "Nombre Propiedad", "Número de pisos", "Fecha Publicación", "Fecha Término", "Precio", "Dueño", "Acción"];




    this.getHouses();
  }

  

  getHouses(){
    this.houseService.getHouses()
      .subscribe(res => {
        this.houseService.houses = res as House[];
    });
  }

  selectToEdit(item: House){
    this.houseService.selectedHouse = item;
  }

  selectToDelete(item: House){
    this.houseService.selectedHouse = item;
  }

  formatPrice(price: String): number {
    // Convierte el precio de String a número
    const priceAsNumber: number = parseInt(price.toString());
    // Formatea el número como moneda
    return priceAsNumber;
  }

  formateDate(date: Date): string  {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  deleteHouse(){
    this.houseService.deleteHouse(this.houseService.selectedHouse._id.toString())
      .subscribe(res => {
        console.log(res);
        this.getHouses();
      });
  }
}
