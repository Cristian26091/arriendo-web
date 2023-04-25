import { Component, OnInit } from '@angular/core';
import { Faq } from 'src/app/models/faq';
import { FaqService } from '../../services/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit {

  constructor( public faqService: FaqService ) { }

  ngOnInit(): void {
    this.getFaqs();
  }

  getFaqs(){
    this.faqService.getFaqs()
      .subscribe( res =>{
        this.faqService.faqs = res as Faq[];
        //console.log(res);
    });
  }

}
