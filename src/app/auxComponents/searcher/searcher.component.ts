import { Component, OnInit} from '@angular/core';
import { RegionService } from '../../services/region.service';
import { Region } from '../../models/region.model';

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
  
  constructor(public RegionService: RegionService){
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
        console.log(this.regionesOptions);
    });
  }

  onRegionSelected(event: any){
    this.selectedRegion = event.target.value;
    // console.log(event.target.value);
    const region = this.regionesOptions.find(r => r.nombre_region === this.selectedRegion);
    
      this.comunasOptions = region.comunas.map(c => c.nombre_comuna);
    
    console.log(this.comunasOptions)

  }

  onComunaSelected(event: any){
    this.selectedComuna = event.target.value;
    // console.log(event.value);
  }

  onTipoViviendaSelected(event: any){
    this.selectedTipoVivienda = event.target.value;
    console.log(event.target.value);
  }

}
