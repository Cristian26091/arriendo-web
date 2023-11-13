import { Component, EventEmitter, OnInit, Output  } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() cambiarContenido = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  mostrarHome() {
    this.cambiarContenido.emit('home');
  }

  mostrarUsuarios() {
    this.cambiarContenido.emit('usuarios');
  }

  mostrarReservas() {
    this.cambiarContenido.emit('reservas');
  }

  mostrarCasas(){
    this.cambiarContenido.emit('casas');
  }

  mostrarIndex(){
    this.cambiarContenido.emit('index');
  }

  //evento para cerrar sesión
  salir() {
    this.cambiarContenido.emit('salir');
  }

}
