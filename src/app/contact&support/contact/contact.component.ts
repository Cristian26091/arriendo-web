import { Component,} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/models/contact';
import { ContactService } from '../../services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent  {

  durationInSeconds = 3;

  constructor( public contactService: ContactService, private _snackBar: MatSnackBar){

  }

  sendMessage(form: NgForm){
    this.contactService.postContact(form.value)
      .subscribe(res => {
        // console.log(res);
        this.resetForm(form);
      });
      
    // console.log(form.value);
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.contactService.selectedContact = new Contact();
      this.openSnackBar('Mensaje enviado con exito!', 'Aceptar');
    }
  }

  openSnackBar(message: string, action){
    let snackBarRef = this._snackBar.open(message, action, {duration: 1000*this.durationInSeconds});
    // this._snackBar.openFromComponent(message, {duration:this.durationInSeconds*1000} );
    
  }

}
