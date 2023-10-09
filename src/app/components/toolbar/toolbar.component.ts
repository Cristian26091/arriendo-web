import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { SignupService } from '../../services/signup.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

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


  constructor(private loginService: LoginService, private signupService: SignupService,
     private userService: UserService, private TokenService: TokenService, private router: Router) {
  }

  ngOnInit(): void {

    // Suscríbete para escuchar cuando se inicia sesión con éxito
    this.loginService.loginSuccess$.subscribe((success) => {
      if (success) {
        console.log('Login success');
        this.closeModal();
        this.checkAuthentication(); // Verifica la autenticación después del inicio de sesión
      }
    });

    // Suscríbete para escuchar cuando se registra un nuevo usuario con éxito
    this.signupService.signupSuccess$.subscribe((success) => {
      if (success) {
        console.log('Signup success');
        this.toggleForms();
        //emitir una alerta de registro exitoso
        this.showSuccessAlert = true; // Mostrar la alerta de registro exitoso
        setTimeout(() => {
          this.showSuccessAlert = false; // Ocultar la alerta después de cierto tiempo (por ejemplo, 5 segundos)
        }, 4000); // 5000 milisegundos (5 segundos)
      }
    });

    // Verificar la autenticación cuando se carga la página
    this.checkAuthentication();

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
  }

  goToBookings() {
    this.router.navigate(['/bookings']);
  }

}
export class AppModule { }


