import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PriceFilterComponent } from './price-filter/price-filter.component';
import { FilterListResponse } from '../../models/dto/filter-list-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-side-bar',
  imports: [PriceFilterComponent, CommonModule],
  templateUrl: './list-side-bar.component.html',
  styleUrl: './list-side-bar.component.css'
})
export class ListSideBarComponent {
  // @Input({ required: true })
  filterList: FilterListResponse = new FilterListResponse(null,null,null,null);
  // @Input({ required: true })
  selectionTypeTitle: String = "";

  @ViewChild(PriceFilterComponent) priceFilter!: PriceFilterComponent;

  @Output() sendFilters = new EventEmitter<{priceMin:number;priceMax:number;inStockItems:boolean;brandIdsList:number[]}>();
  priceMin:number=0;
  priceMax:number=5000;
  inStockItems: boolean =false;
  brandIdsList: number[] = [];

  public initialFilterSet(theFilter:FilterListResponse){
    this.filterList=theFilter;
    this.priceMin=theFilter.priceMin!=null?theFilter.priceMin:0;
    this.priceMax=theFilter.priceMax!=null?theFilter.priceMax:5000;
    this.priceFilter.initialSet(theFilter.priceMin!=null?theFilter.priceMin:0,theFilter.priceMax!=null?theFilter.priceMax:5000);
  }
  public initialTitleSet(title:String){
    this.selectionTypeTitle=title;
  }

  inStockCheckChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.inStockItems=checkbox.checked;
    this.filtersChanged();
  }
  brandChecksChange(event: Event, brandId:number){
    console.log("brandChecksChange(event,"+brandId+")");
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      // If the checkbox is checked and the brandId is not already in the list, add it
      if (!this.brandIdsList.includes(brandId)) {
        this.brandIdsList.push(brandId);
        console.log(`Brand ID ${brandId} added to the list.`);
      }
    } else {
      // If the checkbox is unchecked and the brandId is in the list, remove it
      const index = this.brandIdsList.indexOf(brandId);
      if (index !== -1) {
        this.brandIdsList.splice(index, 1);
        console.log(`Brand ID ${brandId} removed from the list.`);
      }
    }
    this.filtersChanged();
  }

  receivePriceRange(params: { min: number; max: number;}) {
    this.priceMin=params.min;
    this.priceMax=params.max;
    this.filtersChanged();
  }

  filtersChanged(){
    const priceMin:number =this.priceMin ;
    const priceMax:number=this.priceMax
    const inStockItems:boolean=this.inStockItems;
    const brandIdsList:number[]=this.brandIdsList;
    this.sendFilters.emit({ priceMin ,priceMax,inStockItems,brandIdsList });
  }
  
}
