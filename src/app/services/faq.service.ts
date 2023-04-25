import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Faq } from '../models/faq';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  selectedFaq: Faq;
  faqs: Faq[];

  readonly URL_API = 'http://127.0.0.1:3000/api/faq'

  constructor(private http: HttpClient){
    
    this.selectedFaq = new Faq();

  }

  getFaqs(){
    return this.http.get(this.URL_API);
  }

  postFaq(faq: Faq){
   
  }

  putFaq(faq: Faq){
    
  }

  deleteFaq(_id : string){
    
  }

}
