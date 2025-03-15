import { Product } from "./product";
import { User } from "./user";

export class Like {
    id: number;
    user: User;
    product: Product;
    isLiked: boolean;
    
    constructor(user: User, product: Product, isLiked: boolean, id: number) {
        this.user = user;
        this.product = product;
        this.isLiked = isLiked;
        this.id = 0;
    }
}
