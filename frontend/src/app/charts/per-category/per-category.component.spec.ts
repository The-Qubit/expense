import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerCategoryComponent } from './per-category.component';

describe('PerCategoryComponent', () => {
  let component: PerCategoryComponent;
  let fixture: ComponentFixture<PerCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerCategoryComponent]
    });
    fixture = TestBed.createComponent(PerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
