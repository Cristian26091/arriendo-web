import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  selectedContact: Contact;
  contacts: Contact[];

  readonly URL_API = 'http://127.0.0.1:3000/api/contact'

  constructor(private http: HttpClient){
    
    this.selectedContact = new Contact();

  }

  getContacts(){
    return this.http.get(this.URL_API);
  }

  postContact(contact: Contact){
    return this.http.post(this.URL_API, contact);
  }

  putContact(contact: Contact){
    return this.http.put(this.URL_API + `/${contact._id}`, contact);
  }

  deleteContact(_id : string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }

 
}
