import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_KEY = 'accessToken';

  constructor() { }

  // Almacena el token en localStorage o sessionStorage
  storeToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Recupera el token desde localStorage o sessionStorage
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Elimina el token de localStorage o sessionStorage
  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
