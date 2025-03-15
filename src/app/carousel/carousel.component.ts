import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

import Swiper from 'swiper';

@Component({
  selector: 'app-carousel',
  imports: [RouterModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('mySwiper', { static: false }) swiperElement!: ElementRef;
  private mySwiper!: Swiper;
  autoplayInterval: any | undefined; // Variable to hold the setInterval ID
  timeoutActive: boolean = false; // Flag to track if the timeout is active


  ngAfterViewInit() {

    this.mySwiper = new Swiper(this.swiperElement.nativeElement, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
    });
    // Attach the slideChange event listener
    this.mySwiper.on('slideChange', () => {
      clearInterval(this.autoplayInterval);
      this.dotUpdater(); // Update dot indicators when slide changes
      this.restartAutoplay();
    });

    this.autoplayInterval = setInterval(this.goNextAuto.bind(this), 5000);

  }
  goNextAuto(){
    this.mySwiper.slideNext();
    this.dotUpdater();
  }
  goNext(){
    clearInterval(this.autoplayInterval);
    this.mySwiper.slideNext();
    this.dotUpdater();
    this.restartAutoplay();
  }
  goPrev(){
    clearInterval(this.autoplayInterval);
    this.mySwiper.slidePrev();
    this.dotUpdater();
    this.restartAutoplay();
  }
  dotClick(index:number){
    this.mySwiper.slideToLoop(index);
    // this.mySwiper.slideTo(index);
    this.dotUpdater();
  }
  dotUpdater(){
    return;
    const dots = document.querySelectorAll<HTMLElement>('.dot');
    let currentIndex = this.mySwiper.realIndex;
    console.log("          currentIndex=  "+this.mySwiper.activeIndex);
    if (currentIndex < 0 || currentIndex >= dots.length) {
      return; // Exit if the index is out of bounds
    }
    dots.forEach((dot, i) => {
      dot.classList.remove('active'); // Remove active class from all dots
      if (i === currentIndex) {
        dot.classList.add('active'); // Add active class to the current dot
      }
    });
  }




  ngOnDestroy(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }
  restartAutoplay(): void {
    // Check if timeout is already active
    if (this.timeoutActive) return; // Exit if already active

    // Set a timeout to restart the autoplay
    this.timeoutActive = true; // Mark timeout as active

    setTimeout(() => {
      this.autoplayInterval = setInterval(this.goNextAuto.bind(this), 5000); // Change slide every 5 seconds
      this.timeoutActive = false; // Reset the flag after the timeout expires
    }, 10000); // Delay of 10 seconds
  }

}
