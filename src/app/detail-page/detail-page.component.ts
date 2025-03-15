import { Component, ElementRef, ViewChild } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from '../services/http-client.service';
import { CommonModule } from '@angular/common';
import { QuantityControllerComponent } from "./quantity-controller/quantity-controller.component";
import { StarRatingComponent } from "../main-page/star-rating/star-rating.component";
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/dto/cart-item';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { DialogService } from '../services/dialog.service';
import { Bookmark } from '../models/bookmark';
import { Like } from '../models/like';

@Component({
  selector: 'app-detail-page',
  imports: [CommonModule, QuantityControllerComponent, StarRatingComponent],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css'
})
export class DetailPageComponent {
  product!:Product;
  isFavorite: boolean = false;
  isBookmark: boolean = false;
  quantity:number=1;
  user:User|null=null;
  

 @ViewChild('imageBox') imageBox!: ElementRef;
  images: string[] = [
    '/products/1/1/apple-iphone-15/thumb.jpg',
    '/products/1/1/google-pixel-9-pro-fold/1.jpg',
    '/products/1/1/asus-zenfone10/1.jpg'
  ];

  constructor(private route: ActivatedRoute,private hClService: HttpClientService,private router: Router,private cartService: CartService,private userService:UserService, private dialogService: DialogService) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.hClService.getProductById(productId).subscribe({
            next: (retVal: Product) => {
              this.product = retVal || null;
              console.log("product::: "+JSON.stringify(this.product));
              if(this.product.imageLinks)
                this.images=this.getImagesPath(this.product.imageLinks?this.product.imageLinks:"");
              if(this.product==null)
                this.rootBackHome();
            },
            error: (error) => {
              this.rootBackHome();
              // console.log('Error details:', JSON.stringify(error, null, 2));
            },
          });
    }
    else{
      this.rootBackHome();
    }

    this.userService.getUser().subscribe(theUser => {
      this.user = theUser;
      //now that we get user we call bookmark and like to put their value
      this.hClService.getBookmark(this.user?.id||0,parseInt(productId||"0")).subscribe({
        next: (retVal: Bookmark) => {
          this.isBookmark = retVal.isBookmarked;
        },
        error: (error) => {
          console.log('Error getting Bookmark, details:', JSON.stringify(error, null, 2));
        },
      });
      this.hClService.getLike(this.user?.id||0,parseInt(productId||"0")).subscribe({
        next: (retVal: Like) => {
          this.isFavorite = retVal.isLiked;
        },
        error: (error) => {
          console.log('Error getting Like, details:', JSON.stringify(error, null, 2));
        },
      });


    });
  }
  rootBackHome(){
    this.router.navigate(['']);
  }

  changeImage(index: number): void {
    console.log("changeImage("+index+")");
    this.imageBox.nativeElement.src = this.images[index]; // Change the current image
  }

  getImagesPath(inputString:string):string[]{
    const parts: string[] = inputString.split(',');
        
        const basepath = parts[0]; // The first element is the base path
        
        // Create an array of concatenated strings
        const result: string[] = parts.slice(1).map(subpath => basepath + subpath);
        
        return result;
  }

  toggleBookmark(){
    if(this.user==null)
      this.dialogService.openLoginDialog();
    else{

      this.isBookmark=!this.isBookmark;

      this.hClService.setBookmark(this.user?.id||0,this.product.id,this.isBookmark).subscribe({
        next: (retVal: Bookmark) => {
          this.isBookmark = retVal.isBookmarked;
        },
        error: (error) => {
          //set the previous value for it as there is an error in setting 
          this.isBookmark=!this.isBookmark;
          console.log('Error setting Bookmark, details:', JSON.stringify(error, null, 2));
        },
      });
    }
  }
  toggleFavorite(){
    if(this.user==null)
      this.dialogService.openLoginDialog();
    else{

      this.isFavorite = !this.isFavorite;

      this.hClService.setLike(this.user?.id||0,this.product.id,this.isFavorite).subscribe({
        next: (retVal: Like) => {
          this.isFavorite = retVal.isLiked;
        },
        error: (error) => {
          //set the previous value for it as there is an error in setting 
          this.isFavorite=!this.isFavorite;
          console.log('Error setting Like, details:', JSON.stringify(error, null, 2));
        },
      });
    }
  }

  addToCart(){
    const item:CartItem= new CartItem(this.quantity,this.product);
    this.cartService.addCartItem(item);
  }
  receiveQuantity(params:{quantity:number}){
    this.quantity=params.quantity;
  }




  getFormattedDate(): string {
    if (this.product.date) {
      const date = new Date(this.product.date);
      
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      const year = date.getFullYear();
      const month = monthNames[date.getMonth()];
      const day = date.getDate();

      
      const suffix = this.getDaySuffix(day);
      
      return `${year} ${month} ${day}${suffix}`;
    }
    return 'Unknown Date';
  }
  getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
  
  
}
