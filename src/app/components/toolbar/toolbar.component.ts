import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  showLoginForm = true; // Inicialmente mostramos el formulario de inicio de sesión

  constructor() { }

  ngOnInit(): void {
   
  
  }

  toggleForms() {
    this.showLoginForm = !this.showLoginForm;
  }

}
export class AppModule { }


