import { Component, OnInit, OnDestroy, ViewChild,ElementRef } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { SignupService } from '../../services/signup.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs'; // Importa Subscription desde RxJS

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  showLoginForm = true; // Inicialmente mostramos el formulario de inicio de sesión
  showSuccessAlert: boolean = false;
  @ViewChild('loginSignupModal') loginSignupModal: ElementRef;
  loggedIn: boolean = false; // Variable para controlar si el usuario está autenticado o no
  username: String = ''; // Variable para almacenar el nombre de usuario autenticado

  private loginSuccessSubscription: Subscription;
  private signupSuccessSubscription: Subscription;
  
  constructor(private loginService: LoginService, private signupService: SignupService,
     private userService: UserService, private TokenService: TokenService, private router: Router) {
  }

  ngOnInit(): void {

    // Suscríbete para escuchar cuando se inicia sesión con éxito
    this.loginSuccessSubscription = this.loginService.loginSuccess$.subscribe((success) => {
      if (success) {
        this.closeModal();
        this.checkAuthentication();
      }
    });

    // Suscríbete para escuchar cuando se registra un nuevo usuario con éxito
    this.signupSuccessSubscription = this.signupService.signupSuccess$.subscribe((success) => {
      if (success) {
        this.toggleForms();
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showSuccessAlert = false;
        }, 4000);
      }
    });

    // Verificar la autenticación cuando se carga la página
    this.checkAuthentication();

  }

  ngOnDestroy(): void {
    // Cancelar las suscripciones cuando el componente se destruye
    this.loginSuccessSubscription.unsubscribe();
    this.signupSuccessSubscription.unsubscribe();
  }

  toggleForms() {
    this.showLoginForm = !this.showLoginForm;
  }

  closeModal() {
    // Obtén una referencia al elemento del backdrop
    const backdropElement = document.querySelector('.modal-backdrop');
    // Verifica si el backdrop existe y elimínalo
    if (backdropElement) {
      backdropElement.remove();
    }
    this.loginSignupModal.nativeElement.classList.remove('show');
  }

  checkAuthentication() {
    this.loggedIn = this.loginService.isAuthenticated();
    if (this.loggedIn) {
    this.userService.getUser(this.TokenService.getUserID()).subscribe((res : User) =>{
      this.username = res.nombre; 
    }); 
    // console.log("token", this.TokenService.getToken());
    // console.log("user_id", this.TokenService.getUserID());
      
    }
  }


  logout() {
    this.loginService.logout(); // Debes implementar logout en tu servicio
    this.checkAuthentication(); // Verifica la autenticación después de cerrar la sesión
    // window.location.reload();
  }

  goToBookings() {
    this.router.navigate(['/bookings']);
  }

}
export class AppModule { }


