import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:User|null=null;
  userSubject:BehaviorSubject<User|null>=new BehaviorSubject(this.user);

  constructor() { }

  getUser(){
    return this.userSubject.asObservable(); // Return observable for subscribers
  }
  getUserValue(){
    return this.user;
  }
  setUser(user:User){
    this.user=user;
    this.userSubject.next(this.user);
  }
}
