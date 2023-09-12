import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginSuccessSubject = new BehaviorSubject<boolean>(false);
  loginSuccess$ = this.loginSuccessSubject.asObservable();

  constructor(private cookieService: CookieService) {

  }

  loginSuccess() {
    this.loginSuccessSubject.next(true);
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    // Comprueba si existe una cookie de autenticación llamada 'secreto_acceso'
    const token = this.cookieService.get('accessToken');
    return !!token; // Devuelve true si hay un token, false si no lo hay
  }

  // Cierra la sesión del usuario
  logout() {
    // Elimina la cookie de autenticación llamada 'secreto_acceso'
    this.cookieService.delete('accessToken');
  }

  
}
