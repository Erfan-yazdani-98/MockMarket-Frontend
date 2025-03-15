import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/dto/cart-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-button',
  imports: [CommonModule],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.css'
})
export class CartButtonComponent implements OnInit {
  cartItems:CartItem[]=[];
  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  calculateTotalPrice():number{
    let total:number=0;
    for(let item of this.cartItems)
      total+=((item.product.isOffer?item.product.offerPrice:item.product.price)||0)*item.quantity;
    return this.formatNumber(total);
  }

  removeItem(id:number){
    this.cartService.removeCartItem(id);
  }

  formatNumber(value: number): number {
    // Check if the number is an integer
    if (value % 1 === 0) {
        return value; // Return as is for integers
    }
    // Format to two decimal places and trim
    return parseFloat(value.toFixed(2));
}

}
