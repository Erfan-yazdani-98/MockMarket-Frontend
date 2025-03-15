import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageProductListComponent } from './main-page-product-list.component';

describe('MainPageProductListComponent', () => {
  let component: MainPageProductListComponent;
  let fixture: ComponentFixture<MainPageProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageProductListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
