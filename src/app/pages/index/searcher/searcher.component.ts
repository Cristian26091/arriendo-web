import { Component, OnInit} from '@angular/core';
import { RegionService } from '../../../services/region.service';
import { Region } from '../../../models/region.model';
import { Router } from '@angular/router';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/room';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent{
  
  selectedRegion: string;
  selectedComuna: string;
  selectedTipoVivienda: string;
  comunasOptions: string[];

  
  constructor(public RegionService: RegionService, private router: Router, private RoomService: RoomService, private cookieService: CookieService){
    this.comunasOptions = [];
    this.selectedRegion = "";
    this.selectedComuna = "";
    this.selectedTipoVivienda = "";
  }

  ngOnInit(): void {
    this.getRegions();
    this.emptyFilter();
    // Recupera la búsqueda de las cookies (si existe)
    const savedSearch = this.cookieService.get('busquedaResultados');
    if (savedSearch) {
      this.RoomService.rooms = JSON.parse(savedSearch) as Room[];
    }
  }

  ngOnDestroy(){
    this.RoomService.rooms = [];
  }

  // Funcion que obtiene las regiones desde la base de datos para aplicarlas al filtro 
  getRegions(){
    this.RegionService.getRegions()
      .subscribe( res =>{
        this.RegionService.regions = res as Region[];
    });
  }

  // Evento accionado cuando se seleciona una region
  onRegionSelected(event: any){
    this.selectedRegion = event.target.value;//obtengo el nombre de la region seleccionada
    const region = this.RegionService.regions.find(r => r.nombre_region === this.selectedRegion);
    
    if (region) {
      this.comunasOptions = region.comunas.map((c) => c.nombre_comuna);
    } else {
      this.comunasOptions = [];
    }

    // console.log(this.RegionService.regions);
  }

  // Evento accionado cuando se seleciona una comuna
  onComunaSelected(event: any){
    this.selectedComuna = event.target.value;
  }

  // Evento accionado cuando se seleciona un tipo de vivienda 
  onTipoViviendaSelected(event: any){
    this.selectedTipoVivienda = event.target.value;
    // console.log(this.selectedTipoVivienda)
  }

  // Funcion que se ejecuta cuando se presiona el boton buscar
  buscar() {
    const queryParams = {
      region: this.selectedRegion,
      comuna: this.selectedComuna,
      casa_depto: this.selectedTipoVivienda
    };

    if(!this.isVoidFilter()){
      // Llamar al servicio para obtener los resultados de búsqueda
      this.RoomService.getRoomByFilter(queryParams).subscribe(
        (res) => {
          // Manejar los resultados dentro de la suscripción
          this.RoomService.rooms = res as Room[];
          // Guarda los resultados en las cookies
          this.cookieService.set('busquedaResultados', JSON.stringify(this.RoomService.rooms));
          // Navegar a la página de resultados
          this.router.navigate(['/results']);
          // console.log(this.RoomService.rooms);
        },
        (error) => {
          // Manejar errores si los hay
          console.error('Error al obtener los resultados de búsqueda:', error);
        }
      );
    }
    else{
      this.cookieService.delete('busquedaResultados');
      this.router.navigate(['/results']);
    }
    
  }

  isVoidFilter(){
    return this.selectedRegion === "" && this.selectedComuna === "" && this.selectedTipoVivienda === "";
  }

  emptyFilter(){
    this.selectedRegion = "";
    this.selectedComuna = "";
    this.selectedTipoVivienda = "";
  }

}
