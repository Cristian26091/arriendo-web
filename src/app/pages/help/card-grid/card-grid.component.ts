import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeelpService } from 'src/app/services/heelp.service';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.css']
})
export class CardGridComponent implements OnInit {

  constructor(private router: Router, public heelpService : HeelpService) { }

  ngOnInit(): void {
  
  }

  seleccionarCategoria(categoria: any) {
    this.heelpService.selectedHelp = categoria; // Almacena la categoría seleccionada en el servicio
    this.router.navigate(['/faq']); // Navega a la página de ayuda
  }

}
