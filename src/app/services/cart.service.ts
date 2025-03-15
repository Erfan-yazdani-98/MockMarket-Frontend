import { Injectable } from '@angular/core';
import { CartItem } from '../models/dto/cart-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems:CartItem[]=[];
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject(this.cartItems);

  constructor() { }

  getCartItems(){
    return this.cartItemsSubject.asObservable(); // Return observable for subscribers
  }
  addCartItem(item:CartItem){
    const existingItem = this.cartItems.find(cartItem => cartItem.product.id === item.product.id);
    if(existingItem){
      existingItem.quantity+=item.quantity;
    }
    else
      this.cartItems.push(item);
    this.cartItemsSubject.next(this.cartItems);
  }

  removeCartItem(itemId: number) {
    // Filter out the item with the specified ID
    this.cartItems = this.cartItems.filter(cartItem => cartItem.product.id !== itemId);

    this.cartItemsSubject.next(this.cartItems);
}

}
