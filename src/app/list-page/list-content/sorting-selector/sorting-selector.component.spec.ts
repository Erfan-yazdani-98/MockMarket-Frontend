import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingSelectorComponent } from './sorting-selector.component';

describe('SortingSelectorComponent', () => {
  let component: SortingSelectorComponent;
  let fixture: ComponentFixture<SortingSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortingSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortingSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
