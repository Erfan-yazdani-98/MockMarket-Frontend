import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityControllerComponent } from './quantity-controller.component';

describe('QuantityControllerComponent', () => {
  let component: QuantityControllerComponent;
  let fixture: ComponentFixture<QuantityControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantityControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
