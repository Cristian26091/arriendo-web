import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_KEY = 'accessToken';
  private TOKEN_USER = 'user_id';

  constructor(private cookieService: CookieService) { }

  // Almacena el token en localStorage o sessionStorage
  storeToken(token: string, user: User) {
    const hour = (1/24); // 1hora
    this.cookieService.set(this.TOKEN_KEY, token, hour);
    this.cookieService.set(this.TOKEN_USER, user["_id"], hour);
  }

  // Recupera el token desde localStorage o sessionStorage
  getToken(): string | null {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  getUserID(): string | null {
    return this.cookieService.get(this.TOKEN_USER);
  }

  // Elimina el token de localStorage o sessionStorage
  removeToken() {
    this.cookieService.delete(this.TOKEN_KEY);
    this.cookieService.delete(this.TOKEN_USER);
  }

}
