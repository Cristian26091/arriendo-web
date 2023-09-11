import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User;
  users: User[];

  readonly URL_API = environment.uri+'/api/user'

  constructor(private http: HttpClient) { 
    this.selectedUser = new User();
    this.users = [];

  }

  getUsers(){
    return this.http.get(this.URL_API);
  }

  getUser(_id: string){
    return this.http.get(this.URL_API+`/${_id}`);
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

  putUser(user: User){}

  deleteUser(_id: string){}
}
