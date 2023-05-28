import { Component, OnInit } from '@angular/core';

declare var bootstrap: any;

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
    const carousel = new bootstrap.Carousel(carouselElement);

  }

}
