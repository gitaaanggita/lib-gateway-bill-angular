import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensationNominalEditComponent } from './dispensation-nominal-edit.component';

describe('DispensationNominalEditComponent', () => {
  let component: DispensationNominalEditComponent;
  let fixture: ComponentFixture<DispensationNominalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensationNominalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensationNominalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
