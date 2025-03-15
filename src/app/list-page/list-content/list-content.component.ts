import { Component, EventEmitter, Input, input, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductCardComponent } from '../../main-page/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { SortingSelectorComponent } from './sorting-selector/sorting-selector.component';
import { Product } from '../../models/product';
import { PaginationComponent } from "./pagination/pagination.component";

@Component({
  selector: 'app-list-content',
  imports: [ProductCardComponent, CommonModule, SortingSelectorComponent, PaginationComponent],
  templateUrl: './list-content.component.html',
  styleUrl: './list-content.component.css',
})
export class ListContentComponent {


  @Input({ required: true })
  products: Product[] = [];
  @Input()
  totalPages:number=1;
  @Input()
  currentPage:number=0;

  @Output() sendSorting = new EventEmitter<{sortingTypeId:number}>();
  @Output() sendPagination = new EventEmitter<{toPage:number}>();
  receiveSorting(params:{sortingTypeId:number}){
    this.sendSorting.emit({sortingTypeId:params.sortingTypeId});
  }
  receivePagination(params:{toPage:number}){
    this.sendPagination.emit({toPage:params.toPage});
  }
}
