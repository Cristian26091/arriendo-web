import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Sistema web de arriendo';
  mostrarToolbar: boolean;

  constructor(private router: Router){
    this.mostrarToolbar = false;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mostrarToolbar = this.shouldShowToolbar(event.urlAfterRedirects);
      }
    });
  }
  
  shouldShowToolbar(url: string): boolean {
    // Define un patrón de expresión regular para las rutas que deseas mostrar la barra de herramientas
    const rutaPatron = /^\/(index|results|room\/\d+|help|faq|claim|payment)/;

    // Verifica si la ruta actual coincide con el patrón
    return rutaPatron.test(url);
  }
}
