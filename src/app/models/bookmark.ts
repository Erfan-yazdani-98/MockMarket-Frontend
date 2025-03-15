import { Product } from "./product";
import { User } from "./user";

export class Bookmark {
    id: number;
    user: User;
    product: Product;
    isBookmarked: boolean;

    constructor(user: User, product: Product, isBookmarked: boolean, id: number) {
        this.user = user;
        this.product = product;
        this.isBookmarked = isBookmarked;
        this.id = 0;
    }
}