import { Brand } from './brand';
import { SubCategory } from './sub-category';

export class Product {
  id: number;
  name: string;
  subCategory: SubCategory;
  brand: Brand;
  thumbnailImage: string | null; // Nullable
  imageLinks: string | null; // Nullable
  shortDescription: string | null; // Nullable
  longDescription: string | null; // Nullable
  price: number | null; // Nullable
  isOffer: boolean;
  offerPrice: number | null; // Nullable
  salePercentage: number | null; // Nullable
  details: string | null; // Nullable
  soldCount: number | null; // Nullable
  visitCount: number | null; // Nullable
  quantity: number | null; // Nullable
  date: Date | null; // Nullable
  rate: number | null; // Nullable

  constructor(
    id: number,
    name: string,
    subCategory: SubCategory,
    brand: Brand,
    thumbnailImage: string | null,
    imageLinks: string | null,
    shortDescription: string | null,
    longDescription: string | null,
    price: number | null,
    isOffer: boolean,
    offerPrice: number | null,
    salePercentage: number | null,
    details: string | null,
    soldCount: number | null,
    visitCount: number | null,
    quantity: number | null,
    date: Date | null,
    rate: number | null
  ) {
    this.id = id;
    this.name = name;
    this.subCategory = subCategory;
    this.brand = brand;
    this.thumbnailImage = thumbnailImage;
    this.imageLinks = imageLinks;
    this.shortDescription = shortDescription;
    this.longDescription = longDescription;
    this.price = price;
    this.isOffer = isOffer;
    this.offerPrice = offerPrice;
    this.salePercentage = salePercentage;
    this.details = details;
    this.soldCount = soldCount;
    this.visitCount = visitCount;
    this.quantity = quantity;
    this.date = date;
    this.rate = rate;
  }
}
