import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelBillComponent } from './cancel-bill.component';

describe('CancelBillComponent', () => {
  let component: CancelBillComponent;
  let fixture: ComponentFixture<CancelBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
