import { AfterViewInit, Component } from '@angular/core';
import { VetrinaComponent } from './vetrina/vetrina.component';
import { MainPageProductListComponent } from './main-page-product-list/main-page-product-list.component';
import { ProductCard} from '../models/product-card';
import { BrandsWindowComponent } from './brands-window/brands-window.component';
import { HttpClientService } from '../services/http-client.service';
import { Product } from '../models/product';
import { ProductRequest } from '../models/dto/product-request';
import { ProductResponse } from '../models/dto/product-response';

import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from "../carousel/carousel.component";

@Component({
  selector: 'app-main-page',
  imports: [
    VetrinaComponent,
    MainPageProductListComponent,
    BrandsWindowComponent,
    CommonModule,
    CarouselComponent
],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements AfterViewInit {

  offerProducts:Product[]=[];
  bestSellerProducts:Product[]=[];
  popularProducts:Product[]=[];
  loading: boolean = true;
  loadingMessage: string= "Loading, please wait...";

  constructor(
    private hClService: HttpClientService,
  ) {}

  ngAfterViewInit(): void {
    this.updateLists();
  }

  updateLists() {
    this.loading = true;

    let request : ProductRequest = new ProductRequest(null,null,null,null,null,null,null,null,null,0,18);
    

    const requests = [
      this.hClService.getFirstPageProducts("products/offer").pipe(tap(retVal => this.offerProducts = retVal.products || [])),
      this.hClService.getFirstPageProducts("products/bestseller").pipe(tap(retVal => this.bestSellerProducts = retVal.products || [])),
      this.hClService.getFirstPageProducts("products/popular").pipe(tap(retVal => this.popularProducts = retVal.products || []))
    ];

    // Execute all requests
    forkJoin(requests).subscribe({
      next: () => {
        this.loading = false; // All requests completed
      },
      error: (error) => {
        console.log('Error details:', JSON.stringify(error, null, 2));
        this.loadingMessage="Something went wrong. Please refresh the page or try again later."
      },
    });

    
  }


}
