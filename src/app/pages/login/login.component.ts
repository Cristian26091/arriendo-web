import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMessage: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.username && this.password) {
      const credentials = {
        email: this.username,
        password: this.password
      };

      console.log(credentials)
    }
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

}
