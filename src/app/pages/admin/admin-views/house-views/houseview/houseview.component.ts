import { Component, OnInit } from '@angular/core';
import { House } from '../../../../../models/house';
import { HouseService } from '../../../../../services/house.service';

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
    this.headTableContent = ["ID", "Fecha publicación", "Fecha Término", "Precio", "Dueño", "Acción"];
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

  editHouse(){

  }

  deleteHouse(){
    this.houseService.deleteHouse(this.houseService.selectedHouse._id.toString())
      .subscribe(res => {
        console.log(res);
        this.getHouses();
      });
  }
}
