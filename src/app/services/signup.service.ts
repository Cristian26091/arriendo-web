import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private signupSuccessSubject = new BehaviorSubject<boolean>(false);
  signupSuccess$ = this.signupSuccessSubject.asObservable();


  constructor() { }

  signupSuccess() {
    this.signupSuccessSubject.next(true);
  }
}
