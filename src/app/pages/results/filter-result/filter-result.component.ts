import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { RegionService } from '../../../services/region.service';
import { Region } from '../../../models/region.model';

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
    
  }

  getRegions(){
  
  }

  onRegionSelected(event: MatSelectChange){
   
  }

  onComunaSelected(event: MatSelectChange){
   
  }

  applyFilter() {
   
  }
}
