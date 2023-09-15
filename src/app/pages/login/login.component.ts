import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  errorMessage: string;

  constructor(private userService: UserService, private loginService: LoginService, private tokenService: TokenService ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.email && this.password) {
      this.userService.login(this.email, this.password).subscribe(
        (response) => {
          // Manejar la respuesta del servidor (token de autenticación, redireccionar, etc.)
          this.tokenService.storeToken(response['token'], response['user']);
          this.loginService.loginSuccess();

          this.clearForm();
        },
        (error) => {
          // Manejar errores de inicio de sesión
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  clearForm() {
    this.email = '';
    this.password = '';
    this.errorMessage = '';
  }


}
