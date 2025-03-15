import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsWindowComponent } from './brands-window.component';

describe('BrandsWindowComponent', () => {
  let component: BrandsWindowComponent;
  let fixture: ComponentFixture<BrandsWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
