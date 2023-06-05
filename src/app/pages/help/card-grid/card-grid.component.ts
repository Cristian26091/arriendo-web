import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.css']
})
export class CardGridComponent implements OnInit {

  cards = [
    { title: 'Card 1', content: 'This is the content of card 1.' },
    { title: 'Card 2', content: 'This is the content of card 2.' },
    { title: 'Card 3', content: 'This is the content of card 3.' },
    { title: 'Card 4', content: 'This is the content of card 4.' },
    // Agrega más tarjetas si es necesario
  ];



  constructor() { }

  ngOnInit(): void {
  }


}
