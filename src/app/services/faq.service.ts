import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Faq } from '../models/faq';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  selectedFaq: Faq;
  faqs: Faq[];

  readonly URL_API = environment.uri+'/api/faq'

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
