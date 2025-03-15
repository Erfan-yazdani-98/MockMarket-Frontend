import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Product } from '../../models/product';

@Component({
  selector: 'app-main-page-product-list',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './main-page-product-list.component.html',
  styleUrl: './main-page-product-list.component.css',
})
export class MainPageProductListComponent implements AfterViewInit {
  @Input({ required: true })
  products!: Product[];
  @Input({ required: true })
  listTitle!: string;
  @Input()
  backgroundColor: string = '#fff';
  @Input()
  textColor: string = '#444';
  @Input()
  icon: string = 'fa-solid fa-tags';

  @ViewChild('mySwiper', { static: false }) swiperElement!: ElementRef;
  private mySwiper!: Swiper;

  ngAfterViewInit() {
    this.mySwiper = new Swiper(this.swiperElement.nativeElement, {
      slidesPerView: window.innerWidth < 400 ?(window.innerWidth / 145): window.innerWidth < 600 ?(window.innerWidth / 155):(window.innerWidth / 190),
      setWrapperSize: true,
      spaceBetween: 0,
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(e: TouchEvent): void {
    if (this.mySwiper) {
      this.mySwiper.params.slidesPerView = window.innerWidth < 400 ?(window.innerWidth / 145): window.innerWidth < 600 ?(window.innerWidth / 155):(window.innerWidth / 190); // Recalculate slides
      this.mySwiper.update(); // Update the Swiper instance
    }
  }
}
