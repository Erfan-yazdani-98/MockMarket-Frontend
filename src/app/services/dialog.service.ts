import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }

  openLoginDialog(){
    this.dialog.open(LoginComponent,{
      width:'350px',
      disableClose:false
    })
  }

}
