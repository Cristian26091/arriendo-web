import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-carrousel',
  templateUrl: './index-carrousel.component.html',
  styleUrls: ['./index-carrousel.component.css']
})
export class IndexCarrouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Inicializar el carrusel
    const carouselElement = document.getElementById('carouselExample');

  }

}
