import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartColumnsComponent } from './cart-columns.component';

describe('CartColumnsComponent', () => {
  let component: CartColumnsComponent;
  let fixture: ComponentFixture<CartColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
