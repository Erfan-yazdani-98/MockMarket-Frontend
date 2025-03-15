import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-brands-window',
  imports: [RouterModule],
  templateUrl: './brands-window.component.html',
  styleUrl: './brands-window.component.css'
})
export class BrandsWindowComponent implements AfterViewInit{
  @ViewChild('scroller') scroller!: ElementRef;
  @ViewChild('scrollerInner') scrollerInner!: ElementRef;

ngAfterViewInit(): void {
  if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    this.addAnimation();
}

addAnimation(){
  this.scroller.nativeElement.setAttribute("data-animated", true);

  const scrollerContent = this.scrollerInner.nativeElement.querySelectorAll('li');
  console.log("Content = "+ scrollerContent);
  scrollerContent.forEach((item: HTMLElement)=>{
    const duplicatedItem = item.cloneNode(true) as HTMLElement;
    duplicatedItem.setAttribute("aria-hidden","true");
    this.scrollerInner.nativeElement.appendChild(duplicatedItem);
  });
}

}
