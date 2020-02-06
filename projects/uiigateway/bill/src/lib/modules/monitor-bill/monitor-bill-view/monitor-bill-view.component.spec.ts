import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorBillViewComponent } from './monitor-bill-view.component';

describe('MonitorBillViewComponent', () => {
  let component: MonitorBillViewComponent;
  let fixture: ComponentFixture<MonitorBillViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorBillViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorBillViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
