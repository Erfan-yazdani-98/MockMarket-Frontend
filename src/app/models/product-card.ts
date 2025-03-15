export class ProductCard {
  title: string;
  imgsrc: string;
  rate: number;
  price: number;
  isOffer: boolean;
  offerPrice?: number; // Using optional chaining as it may not always be present
  salePercentage?: number; // Optional as well

  constructor(
    title: string,
    imgsrc: string,
    rate: number,
    price: number,
    isOffer: boolean,
    offerPrice?: number,
    salePercentage?: number
  ) {
    this.title = title;
    this.imgsrc = imgsrc;
    this.rate = rate;
    this.price = price;
    this.isOffer = isOffer;
    this.offerPrice = offerPrice;
    this.salePercentage = salePercentage;
  }
}
