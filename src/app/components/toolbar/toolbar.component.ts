import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { SignupService } from '../../services/signup.service';




@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  showLoginForm = true; // Inicialmente mostramos el formulario de inicio de sesión
  showSuccessAlert: boolean = false;
  @ViewChild('loginSignupModal') loginSignupModal: ElementRef;

  constructor(private loginService: LoginService, private signupService: SignupService) { 
  }

  ngOnInit(): void {

    // Suscríbete para escuchar cuando se inicia sesión con éxito
    this.loginService.loginSuccess$.subscribe((success) => {
      if (success) {
        console.log('Login success');
        this.closeModal();
      }
    });

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

}
export class AppModule { }


