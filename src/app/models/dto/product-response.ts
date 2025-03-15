import { Product } from '../product';

export class ProductResponse {
  message: string | null; // Nullable
  products: Product[] | null; // Nullable array of Product
  selectionTypeTitle: string | null; // Nullable
  
  totalPages:number|null; // Total pages
  totalProducts:number|null; // Total products count
  currentPage:number|null;
  
  constructor(
    message: string | null,
    products: Product[] | null,
    selectionTypeTitle: string | null,
    totalPages:number|null,
    totalProducts:number|null,
    currentPage:number|null
  ) {
    this.message = message;
    this.products = products;
    this.selectionTypeTitle = selectionTypeTitle;
    this.totalPages=totalPages;
    this.totalProducts=totalProducts;
    this.currentPage=currentPage;
  }
}
