import { Component, OnInit} from '@angular/core';
import { RegionService } from '../../services/region.service';
import { Region } from '../../models/region.model';

import { Router } from '@angular/router';

import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent{
  
  selectedRegion: string;
  selectedComuna: string;
  selectedTipoVivienda: string; 

  regionesOptions: Region[];  
  comunasOptions: string[];
  
  constructor(public RegionService: RegionService, private router: Router, private RoomService: RoomService){
    this.comunasOptions = [];
    this.regionesOptions = [];
  }

  ngOnInit(): void {
    this.getRegions();
  }

  getRegions(){
    this.RegionService.getRegions()
      .subscribe( res =>{
        // this.RegionService.regions = res as Region[];
        this.regionesOptions = res as Region[];
        // console.log(this.regionesOptions);
    });
  }

  // Evento accionado cuando se seleciona una region
  onRegionSelected(event: any){
    this.selectedRegion = event.target.value;
    // console.log(event.target.value);
    const region = this.regionesOptions.find(r => r.nombre_region === this.selectedRegion);
    
    if (region) {
      this.comunasOptions = region.comunas.map((c) => c.nombre_comuna);
    } else {
      this.comunasOptions = [];
    }
    // console.log(this.comunasOptions)

  }

  // Evento accionado cuando se seleciona una comuna
  onComunaSelected(event: any){
    this.selectedComuna = event.target.value;
    // console.log(event.value);
    
  }

  // Evento accionado cuando se seleciona un tipo de vivienda 
  onTipoViviendaSelected(event: any){
    this.selectedTipoVivienda = event.target.value;
    // console.log(event.target.value);
  }

  buscar() {
    // realizar busqueda en base a estos parametros (hint: utilizar service para la comunicacion de datos etre distintas vistas)
    const queryParams = {
      region: this.selectedRegion,
      comuna: this.selectedComuna,
      tipoVivienda: this.selectedTipoVivienda
    }
    this.getRoomByFilterFront(queryParams);
    console.log("Searcher component .ts", queryParams);
    // this.router.navigate(['/room/'],{ queryParams });
    this.router.navigate(['/results']);
  }

  getRoomByFilterFront(req: any){
    // console.log(req);
    this.RoomService.getRoomByFilter(req).subscribe( (res) =>{
      this.RoomService.rooms = res as Room[];
    });
    console.log("Estas son las piezas filtradas: ", this.RoomService.rooms);
      // Realizar alguna acción adicional aquí, por ejemplo, navegar a otra página
  }
}
