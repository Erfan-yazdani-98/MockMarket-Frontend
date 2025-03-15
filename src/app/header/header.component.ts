import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { CartButtonComponent } from './cart-button/cart-button.component';
import { NgClass, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubCategory } from '../models/sub-category';

@Component({
  selector: 'app-header',
  imports: [SearchComponent, LoginButtonComponent, CartButtonComponent, NgFor,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  categoryList = [
    { id: 1, name: 'Digital Devices' },
    { id: 2, name: 'Home & Living' },
    { id: 3, name: 'Fashion & Accessories' },
    { id: 4, name: 'Health & Beauty' },
  ];
  subcategoryList: SubCategory[][] = [
    [
      {id:1,name:'Mobile Phones',category:this.categoryList[0]},
      {id:2,name:'Laptops & Computers',category:this.categoryList[0]},
      {id:3,name:'Headphones & Earbuds',category:this.categoryList[0]},
      {id:4,name:'Video Game Consoles',category:this.categoryList[0]}
    ],
    [
      {id:5,name:'Furniture',category:this.categoryList[1]},
      {id:6,name:'Kitchen Appliances',category:this.categoryList[1]}
    ],
    [
      {id:7,name:'Jewelry & Watches',category:this.categoryList[2]},
      {id:8,name:'Sunglasses & Accessories',category:this.categoryList[2]},
      {id:9,name:'Footwear',category:this.categoryList[2]}
    ],
    [
      {id:10,name:'Makeup & Cosmetics',category:this.categoryList[3]},
      {id:11,name:'Fitness Equipment',category:this.categoryList[3]}
      ],
  ];
  subcategoryListSelected: SubCategory[] = [];

  @ViewChild('navbarSmallPage') navbar!: ElementRef;
  @ViewChild('bgDark') darkbg!: ElementRef;
  @ViewChild('toggleIcon') toggleIcon!: ElementRef;

  @ViewChild('smallPageSubCategoryList') smallSubCatList!: ElementRef;

  isSmallScreen=false;

  constructor(){
    this.checkScreenSize()
  }
  @HostListener('window:resize',['$event'])
  onResize(event:Event){
    this.checkScreenSize();
  }

  showMenu() {
    this.hideSubcategoryList();
    if (
      this.navbar.nativeElement.className === 'navbar-small-page' ||
      this.darkbg.nativeElement.className === 'bg-dark' ||
      this.toggleIcon.nativeElement.className === 'toggle-icon'
    ) {
      this.navbar.nativeElement.className += ' navbar-small-page--open';
      this.darkbg.nativeElement.className += ' bg-dark--open';
      this.toggleIcon.nativeElement.className += ' toggle-icon-cross';
    } else {
      this.navbar.nativeElement.className = 'navbar-small-page';
      this.darkbg.nativeElement.className = 'bg-dark';
      this.toggleIcon.nativeElement.className =
        'nav-toggle large-screen-remove-flex toggle-icon';
    }
  }

  hideSubcategoryList() {
    this.categoryItemsHover(-1);
    this.smallSubCatList.nativeElement.style.display = 'none';
  }
  showSubcategoryList(item: any) {
    this.subcategoryListSelected = this.subcategoryList[item.id - 1];
    this.categoryItemsHover(item.id - 1);
    this.smallSubCatList.nativeElement.style.display = 'flex';
  }
  categoryItemsHover(index: number) {
    const parentElement = this.navbar.nativeElement.children[0].children[0];
    if (index >= this.categoryList.length) return;
    if (index < 0)
      for (let i = 0; i < this.categoryList.length; i++) {
        parentElement.children[i].style.backgroundColor = 'white';
        parentElement.children[i].style.color = 'black';
      }
    else
      for (let i = 0; i < this.categoryList.length; i++) {
        if (i == index) {
          parentElement.children[i].style.backgroundColor = '#ff6f61';
          parentElement.children[i].style.color = 'white';
        } else {
          parentElement.children[i].style.backgroundColor = 'white';
          parentElement.children[i].style.color = 'black';
        }
      }
  }

  //for closing automatically the smallPage navbar when the windows size is changing
  checkScreenSize(){
    this.isSmallScreen=window.innerWidth<700;
    if(!this.isSmallScreen)
      this.checkNavbarIsClosed();
  }
  checkNavbarIsClosed(){
    if(this.navbar===undefined)
      return;
    if (this.navbar.nativeElement.className === 'navbar-small-page') //if closed
      return;
    else //close it
    this.showMenu();
  }


}
