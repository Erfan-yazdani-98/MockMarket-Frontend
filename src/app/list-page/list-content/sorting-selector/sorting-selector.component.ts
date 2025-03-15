import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sorting-selector',
  imports: [],
  templateUrl: './sorting-selector.component.html',
  styleUrl: './sorting-selector.component.css'
})
export class SortingSelectorComponent implements OnInit,OnDestroy{


  @ViewChild('sortingContainer') sortingContainer!: ElementRef;

  @Output() sendSorting = new EventEmitter<{sortingTypeId:number}>();

  private routeSub!: Subscription;
  private previousParamKey: string | null = null;
  private previousParamValue: string | null = null;
  
  constructor(private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.routeSub = this.route.queryParamMap.subscribe(params => {
      params.keys.forEach(paramKey => {
        const paramValue = params.get(paramKey);
        this.handleQueryParamChange(paramKey, paramValue);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  private handleQueryParamChange(paramKey: string, paramValue: string | null): void {
    if(this.sortingContainer===undefined) return;
    
    this.sortClick(this.sortingContainer.nativeElement.children[1] as HTMLElement,1);

    this.previousParamKey = paramKey;
    this.previousParamValue = paramValue;
  }


  sortClick(element: HTMLElement,sortingTypeId: number){
    for (let child of this.sortingContainer.nativeElement.children) {
      if (child.classList.contains("sorting-option")) {
        child.classList.remove("selected");
      }
    }
    
    element.classList.add("selected");

    this.sendSorting.emit({sortingTypeId});

  }


}
