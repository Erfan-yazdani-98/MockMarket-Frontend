import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-price-filter',
  imports: [],
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.css',
})
export class PriceFilterComponent implements AfterViewInit {
  @ViewChild('minVal') minVal!: ElementRef;
  @ViewChild('maxVal') maxVal!: ElementRef;
  @ViewChild('priceInputMin') priceInputMin!: ElementRef;
  @ViewChild('priceInputMax') priceInputMax!: ElementRef;
  @ViewChild('minTooltip') minTooltip!: ElementRef;
  @ViewChild('maxTooltip') maxTooltip!: ElementRef;
  @ViewChild('range') range!: ElementRef;

  minGap: number = 1000;
  // @Input({ required: true })
  sliderMinValue!: number;
  // @Input({ required: true })
  sliderMaxValue!: number;

  @Output() sendPriceRange = new EventEmitter<{min:number;max:number}>();

  ngAfterViewInit(): void {
    // this.initializeSliderValues();
    // this.slideMin();
    // this.slideMax();
  }

  public initialSet(min:number,max:number) {
    this.sliderMinValue = min;
    this.sliderMaxValue = max;
    this.minGap = (this.sliderMaxValue - this.sliderMinValue) / 5;
    this.priceInputMin.nativeElement.value= this.sliderMinValue;
    this.priceInputMax.nativeElement.value = this.sliderMaxValue;
    this.minVal.nativeElement.min= this.sliderMinValue;
    this.minVal.nativeElement.max= this.sliderMaxValue;
    this.minVal.nativeElement.value= this.sliderMinValue;
    this.maxVal.nativeElement.min = this.sliderMinValue;
    this.maxVal.nativeElement.value = this.sliderMaxValue;
    this.maxVal.nativeElement.max = this.sliderMaxValue;
    
    this.setMinInput(true);
    this.setMaxInput(true);
  }
  private initializeSliderValues(): void {
    // this.sliderMinValue = parseInt(this.minVal.nativeElement.min, 10);
    // this.sliderMaxValue = parseInt(this.maxVal.nativeElement.max, 10);

    this.minGap = (this.sliderMaxValue - this.sliderMinValue) / 5;
    this.minTooltip.nativeElement.style.backgroundColor='red';
    this.priceInputMax.nativeElement.style.backgroundColor='red';
    console.log('minGap:' + this.minGap);
  }

  slideMin() {
    let gap =
      parseInt(this.maxVal.nativeElement.value) -
      parseInt(this.minVal.nativeElement.value);
    if (gap <= this.minGap) {
      this.minVal.nativeElement.value =
        parseInt(this.maxVal.nativeElement.value) - this.minGap;
    }
    this.minTooltip.nativeElement.innerHTML =
      '€' + this.minVal.nativeElement.value;
    this.priceInputMin.nativeElement.value = this.minVal.nativeElement.value;
    this.setArea();
  }

  slideMax() {
    let gap =
      parseInt(this.maxVal.nativeElement.value) -
      parseInt(this.minVal.nativeElement.value);
    if (gap <= this.minGap) {
      this.maxVal.nativeElement.value =
        parseInt(this.minVal.nativeElement.value) + this.minGap;
    }
    this.maxTooltip.nativeElement.innerHTML =
      '€' + this.maxVal.nativeElement.value;
    this.priceInputMax.nativeElement.value = this.maxVal.nativeElement.value;
    this.setArea();
  }

  setArea() {
    let gap = this.sliderMaxValue-this.sliderMinValue;
    this.range.nativeElement.style.left =
      ((this.minVal.nativeElement.value-this.sliderMinValue) / gap) * 100 + '%';
    this.minTooltip.nativeElement.style.left =
      ((this.minVal.nativeElement.value-this.sliderMinValue) / gap) * 100 + '%';
    this.range.nativeElement.style.right =
      100 - ((this.maxVal.nativeElement.value-this.sliderMinValue) / gap) * 100 + '%';
    this.maxTooltip.nativeElement.style.right =
      100 - ((this.maxVal.nativeElement.value-this.sliderMinValue) / gap) * 100 + '%';
  }

  setMinInput(initiallySet:boolean) {
    let minPrice = parseInt(this.priceInputMin.nativeElement.value);
    if (minPrice < this.sliderMinValue) {
      this.priceInputMin.nativeElement.value = this.sliderMinValue;
    }
    this.minVal.nativeElement.value = this.priceInputMin.nativeElement.value;
    this.slideMin();
    
    if(!initiallySet) this.slideValueChanged();
  }

  setMaxInput(initiallySet:boolean) {
    let maxPrice = parseInt(this.priceInputMax.nativeElement.value);
    if (maxPrice > this.sliderMaxValue) {
      this.priceInputMax.nativeElement.value = this.sliderMaxValue;
    }
    this.maxVal.nativeElement.value = this.priceInputMax.nativeElement.value;
    this.slideMax();
    
    if(!initiallySet) this.slideValueChanged();
  }
  slideValueChanged(){
    const min:number=this.minVal.nativeElement.value;
    const max:number=this.maxVal.nativeElement.value;
    this.sendPriceRange.emit({ min ,max });
  }


}
