import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensationDateComponent } from './dispensation-date.component';

describe('DispensationDateComponent', () => {
  let component: DispensationDateComponent;
  let fixture: ComponentFixture<DispensationDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensationDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensationDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
