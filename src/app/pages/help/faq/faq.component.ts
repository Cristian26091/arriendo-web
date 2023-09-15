import { Component, OnInit } from '@angular/core';
import { HeelpService } from 'src/app/services/heelp.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit {

  constructor( public helpService : HeelpService) { }

  ngOnInit(): void {

  }

}
