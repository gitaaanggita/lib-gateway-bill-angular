import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensationNominalComponent } from './dispensation-nominal.component';

describe('DispensationNominalComponent', () => {
  let component: DispensationNominalComponent;
  let fixture: ComponentFixture<DispensationNominalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensationNominalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensationNominalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
