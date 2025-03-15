export class ProductRequest {
  selectingType: string | null; // Nullable
  inputId: number | null; // Nullable
  inputString: string | null; // Nullable
  sortingColumn: string | null; // Nullable
  isAscending: boolean | null; // Nullable
  inStockItems: boolean | null; // Nullable
  priceMin: number | null; // Nullable
  priceMax: number | null; // Nullable
  brandIdsList: number[] | null; // Nullable array of numbers
  //pagination values
  page: number | null; // For current page
  size: number | null; // For page size


  constructor(
    selectingType: string | null,
    inputId: number | null,
    inputString: string | null,
    sortingColumn: string | null,
    isAscending: boolean | null,
    inStockItems: boolean | null,
    priceMin: number | null,
    priceMax: number | null,
    brandIdsList: number[] | null, // Nullable array of numbers
    page:number | null,
    size:number | null,

  ) {
    this.selectingType = selectingType;
    this.inputId = inputId;
    this.inputString = inputString;
    this.sortingColumn = sortingColumn;
    this.isAscending = isAscending;
    this.inStockItems = inStockItems;
    this.priceMin = priceMin;
    this.priceMax = priceMax;
    this.brandIdsList = brandIdsList;
    this.page=page;
    this.size=size;
  }
}
