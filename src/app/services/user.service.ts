import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service'; // Importa el servicio de tokens
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User;
  users: User[];

  readonly URL_API = environment.uri+'/api/user'

  constructor(private http: HttpClient, private tokenService: TokenService) { 
    this.users = [];

  }

  getUsers(){
    return this.http.get(this.URL_API);
  }

  getUser(_id: string): Observable<User>{
    return this.http.get<User>(`${this.URL_API}/${_id}`);
  }

  postUser(user: User){
    return this.http.post(this.URL_API, user);
  }

  // Nuevo método para manejar el inicio de sesión
  login(email: string, password: string) {
    const credentials = {
      email: email,
      password: password
  };

    return this.http.post(`${this.URL_API}/login`, credentials);
  }

  // Método para cargar el usuario desde las cookies	
  loadUserFromCookies(): Observable<User> {
    const userId = this.tokenService.getUserID();
    if (userId) {
      return this.getUser(userId);
    }
    return new Observable<User>(); // Devuelve un observable vacío si no se encuentra el usuario.
  }

  putUser(user: User){}

  deleteUser(userId: string): Observable<any> {
    // Realiza la lógica de eliminación y devuelve un Observable
    return this.http.delete<any>(`${this.URL_API}/${userId}`);
  }
}
