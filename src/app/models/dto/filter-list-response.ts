import { Brand } from '../brand';

export class FilterListResponse {
  message: string | null; // Nullable
  priceMin: number | null; // Nullable
  priceMax: number | null; // Nullable
  brands: Brand[] | null; // Nullable array of Brand

  constructor(
    message: string | null,
    priceMin: number | null,
    priceMax: number | null,
    brands: Brand[] | null // Nullable array of Brand
  ) {
    this.message = message;
    this.priceMin = priceMin;
    this.priceMax = priceMax;
    this.brands = brands;
  }
}
