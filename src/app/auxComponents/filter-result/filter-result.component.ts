import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { RegionService } from '../../services/region.service';
import { Region } from '../../models/region.model';


// interface Region {
//   numero: String,
//   nombre_region: string,
//   comunas: {
//       nombre_comuna: string,
//   }[],
// }

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.css']
})
export class FilterResultComponent implements OnInit {
  regiones : Region[];
  comunas: string[];
  selectedRegion: Region;
  selectedComuna: string;
  filteredContent: any[];//filtra el tipo de dato dependiendo de la estructura del contenido
  originalContent: any[];//actualiza el tipo de dato dependiendo de la estructura del contenido

  constructor(public RegionService: RegionService) { 
    this.filteredContent = []
    this.regiones = [];
    this.originalContent = [];
    this.comunas = [];
  }

  ngOnInit(): void {
    this.getRegions();
  }

  getRegions(){
    this.RegionService.getRegions()
      .subscribe( res =>{
        this.RegionService.regions = res as Region[];
        this.regiones = res as Region[]; //load to the load data
        console.log(this.regiones);
    });
  }

  onRegionSelected(event: MatSelectChange){
    // console.log(this.regiones);
    this.selectedRegion = this.regiones.find(r => r.nombre_region === event.value.nombre_region);
    this.comunas = this.selectedRegion.comunas.map(c => c.nombre_comuna);
    console.log(this.selectedRegion);
  }

  onComunaSelected(event: MatSelectChange){
    this.selectedComuna = event.value;
    console.log(event.value);
  }

  applyFilter() {
    // Aplica el filtro en base a los criterios de búsqueda seleccionados por el usuario
    // Utiliza los valores de los controles de filtro (this.selectedRegion, this.selectedComuna, etc.)
    // para filtrar la lista de contenido original y asignar el resultado a this.filteredContent

    // Ejemplo básico de filtrado
    this.filteredContent = this.originalContent.filter(item => {
      // Puedes utilizar operadores lógicos (&&, ||) para combinar múltiples criterios de búsqueda
      // Retorna true si el item cumple con los criterios de búsqueda, y false si no cumple
      return(this.selectedRegion ? item.region === this.selectedRegion : true)
        && (this.selectedComuna ? item.comuna === this.selectedComuna : true);
    });
  }
}
