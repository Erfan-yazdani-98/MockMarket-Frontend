import { Component, input, OnInit, ViewChild } from '@angular/core';
import { ListSideBarComponent } from './list-side-bar/list-side-bar.component';
import { ListContentComponent } from './list-content/list-content.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductRequest } from '../models/dto/product-request';
import { HttpClientService } from '../services/http-client.service';
import { ProductResponse } from '../models/dto/product-response';
import { Product } from '../models/product';
import { FilterListResponse } from '../models/dto/filter-list-response';

@Component({
  selector: 'app-list-page',
  imports: [ListSideBarComponent, ListContentComponent, RouterModule],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css',
})
export class ListPageComponent implements OnInit {
  request: ProductRequest = new ProductRequest(null,null,null,"date",false,null,null,null,null,0,18);
  products: Product[] = [];
  filterList: FilterListResponse = new FilterListResponse(null,null,null,null);
  selectionTypeTitle: String = "Selected Product List";
  @ViewChild(ListSideBarComponent) sidebar!: ListSideBarComponent;
  totalPages:number=1;
  currentPage:number=0;

  constructor(
    private router: ActivatedRoute,
    private hClService: HttpClientService
  ) {}

  ngOnInit(): void {
    // Subscribe to query parameters
    this.router.queryParams.subscribe((params) => {
      // Check if any parameter is present
      if (params['search'] || params['brand'] || params['subcategory']) {
        this.request = new ProductRequest(null,null,null,"date",false,null,null,null,null,0,18);
        this.initialHandleParams(params);
      }
    });
  }

  initialHandleParams(params: any) {
    const queryParam = Object.keys(params).find((key) =>
      ['search', 'brand', 'subcategory'].includes(key)
    );
    switch (queryParam) {
      case 'search':
        console.log(`Search value: ${params['search']}`);
        this.request.selectingType = 'search';
        this.request.inputString = params['search'];
        break;
      case 'brand':
        console.log(`Brand value: ${params['brand']}`);
        this.request.selectingType = 'brand';
        this.request.inputId = params['brand'];
        break;
      case 'subcategory':
        console.log(`Subcategory value: ${params['subcategory']}`);
        this.request.selectingType = 'subcategory';
        this.request.inputId = params['subcategory'];
        break;
      default:
        console.log('No relevant query parameters found.');
        break;
    }

    console.log('request: ' + JSON.stringify(this.request));
    this.sendGetSelectedProductRequest(true);
    this.sendGetFilterListRequest();
  }

  sendGetSelectedProductRequest(firstTime:boolean) {
    this.hClService.getPosts(this.request).subscribe({
      next: (retVal: ProductResponse) => {
        this.products = retVal.products || [];
        if(firstTime){
          this.selectionTypeTitle = retVal.selectionTypeTitle || "";
          this.sidebar.initialTitleSet(this.selectionTypeTitle!=null?this.selectionTypeTitle:"");
        }
        console.log(`New Information::::  current: ${retVal.currentPage}  numberofPages: ${retVal.totalPages}`);
        this.currentPage=retVal.currentPage?retVal.currentPage:0;
        this.totalPages=retVal.totalPages?retVal.totalPages:1;
        console.log('Products: ' + JSON.stringify(this.products));
      },
      error: (error) => {
        this.products=[];
        console.log('error in loading tasks: ' + error);
        console.log('Error details:', JSON.stringify(error, null, 2));
      },
    });
  }
  sendGetFilterListRequest() {
    this.hClService.getFilterList(this.request).subscribe({
      next: (retVal: FilterListResponse) => {
        this.filterList = retVal || [];
        this.filterList.priceMax=this.roundMax(this.filterList.priceMax!=null?this.filterList.priceMax:5000);
        this.filterList.priceMin=this.roundMin(this.filterList.priceMin!=null?this.filterList.priceMin:0);
        this.sidebar.initialFilterSet(this.filterList);
      },
      error: (error) => {
        console.log('error in loading filterList: ' + error);
        console.log('Error details:', JSON.stringify(error, null, 2));
      },
    });
  }


  receiveFilters(params: { priceMin:number;priceMax:number;inStockItems:boolean;brandIdsList:number[]}) {
    this.request.priceMin=params.priceMin;
    this.request.priceMax=params.priceMax;
    this.request.inStockItems=params.inStockItems;
    this.request.brandIdsList=params.brandIdsList.length>0?params.brandIdsList:null;
    this.request.page=0;
    this.sendGetSelectedProductRequest(false);

  }

  receiveSorting(params:{sortingTypeId:number}){
    switch(params.sortingTypeId){
      case 1:
        this.request.isAscending=false;
        this.request.sortingColumn="date";
        break;
      case 2:
        this.request.isAscending=false;
        this.request.sortingColumn="visitCount";
        break;
      case 3:
        this.request.isAscending=false;
        this.request.sortingColumn="soldCount";
        break;
      case 4:
        this.request.isAscending=true;
        this.request.sortingColumn="price";
        break;
      case 5:
        this.request.isAscending=false;
        this.request.sortingColumn="price";
        break;
      case 6:
        this.request.isAscending=false;
        this.request.sortingColumn="rate";
        break;
      default:
        this.request.isAscending=false;
        this.request.sortingColumn="date";
    }
    this.request.page=0;
    this.sendGetSelectedProductRequest(false);
  }
  receivePagination(params:{toPage:number}){
    this.request.page=params.toPage;
    this.sendGetSelectedProductRequest(false);
  }



  roundMin(value: number): number {
    if (value <= 100) {
        return 0;
    } else {
        return Math.floor(value / 100) * 100;
    }
}

  roundMax(value: number): number {
    if (value < 100) {
        return 100;
    } else {
        return Math.ceil(value / 100) * 100;
    }
}


}
