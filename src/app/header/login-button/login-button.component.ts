import { AfterViewInit, Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-button',
  imports: [CommonModule,RouterModule],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css'
})
export class LoginButtonComponent implements AfterViewInit {
  user:User|null=null;
  constructor(private userService:UserService, private dialogService: DialogService){}

  ngAfterViewInit(): void {
    this.userService.getUser().subscribe(theUser => {
      this.user = theUser;
    });
  }
  loginClick(){
    this.dialogService.openLoginDialog();
  }
}
