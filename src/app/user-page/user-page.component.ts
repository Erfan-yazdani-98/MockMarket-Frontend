import { AfterViewInit, Component } from '@angular/core';
import { MainPageProductListComponent } from '../main-page/main-page-product-list/main-page-product-list.component';
import { HttpClientService } from '../services/http-client.service';
import { Product } from '../models/product';
import { ProductResponse } from '../models/dto/product-response';
import { ProductRequest } from '../models/dto/product-request';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  imports: [MainPageProductListComponent,CommonModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements AfterViewInit  {
    favoriteProducts:Product[]=[];
    bookmarkedProducts:Product[]=[];
    user:User|null=null;

    constructor(private hClService: HttpClientService,private userService: UserService,private router: Router) {}
    
    ngAfterViewInit(): void {
      this.updateLists();
    }

    updateLists() {
        let request : ProductRequest = new ProductRequest(null,null,null,null,null,null,null,null,null,0,18);
        this.user=this.userService.getUserValue();
        if(!this.user){
          this.router.navigate(['']);
          return; 
        }
        this.hClService.getUserPageProducts("likes/list",this.user.id).subscribe({
          next: (retVal: ProductResponse) =>{
            console.log("favorite Products:"+ JSON.stringify(retVal.products));
            this.favoriteProducts = retVal.products || [];
          },
          error: (error) =>{
            console.log('Error details:', JSON.stringify(error, null, 2));
          },
        })
        this.hClService.getUserPageProducts("bookmarks/list",this.user.id).subscribe({
          next: (retVal: ProductResponse) =>{
            console.log("popular Products:"+ JSON.stringify(retVal.products));
            this.bookmarkedProducts = retVal.products || [];
          },
          error: (error) =>{
            console.log('Error details:', JSON.stringify(error, null, 2));
          },
        })
    
        
      }

}
