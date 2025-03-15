import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientService } from '../services/http-client.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginActive: boolean = true;
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(
    private hClService: HttpClientService,
    private userService:UserService,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {}

  panelSelector(login:boolean) {
    this.isLoginActive = login;
    this.errorMessage = '';
  }

  login() {
    this.errorMessage = '';
    if (this.username.length < 4 || this.password.length < 4) {
      this.errorMessage = 'Username and password must be at least 4 characters long.';
      return;
    }

    let user = new User(this.username,this.password,"USER",0)
    this.hClService.login(user).subscribe({
          next: (retVal: User) => {
            user.id=retVal.id;
            this.userService.setUser(user);
            this.dialogRef.close();
          },
          error: (error) => {
            this.errorMessage = 'incorrect information! There is no user with this username & password';
            console.log('error in Login: '+ error);
          },
        });
  }

  signUp() {
    this.errorMessage = '';
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }
    
    if (this.username.length < 4 || this.password.length < 4) {
      this.errorMessage = 'Username and password must be at least 4 characters long.';
      return;
    }

    let user = new User(this.username,this.password,"USER",0)
    this.hClService.register(user).subscribe({
          next: (retVal: User) => {
            user.id=retVal.id;
            this.userService.setUser(user);
            this.dialogRef.close();
          },
          error: (error) => {
            this.errorMessage = 'Something wrong! try again!';
            console.log('error in Sign Up: '+ error);
          },
        });
  }

  _handleEnter() {
    if (this.isLoginActive) {
      this.login();
    } else {
      this.signUp();
    }
  }

}
