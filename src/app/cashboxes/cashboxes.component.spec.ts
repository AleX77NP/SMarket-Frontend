import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashboxesComponent } from './cashboxes.component';

describe('CashboxesComponent', () => {
  let component: CashboxesComponent;
  let fixture: ComponentFixture<CashboxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashboxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
