import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorBillComponent } from './monitor-bill.component';

describe('MonitorBillComponent', () => {
  let component: MonitorBillComponent;
  let fixture: ComponentFixture<MonitorBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
