import { Product } from "../product";

export class CartItem {
    quantity:number;
    product:Product;
    constructor(quantity:number,product:Product){
        this.quantity=quantity;
        this.product=product;
    }
}
