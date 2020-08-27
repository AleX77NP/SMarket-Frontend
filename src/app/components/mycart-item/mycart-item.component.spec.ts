import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycartItemComponent } from './mycart-item.component';

describe('MycartItemComponent', () => {
  let component: MycartItemComponent;
  let fixture: ComponentFixture<MycartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycartItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
