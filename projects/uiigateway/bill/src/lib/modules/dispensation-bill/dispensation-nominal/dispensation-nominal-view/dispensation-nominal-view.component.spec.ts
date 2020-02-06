import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensationNominalViewComponent } from './dispensation-nominal-view.component';

describe('DispensationNominalViewComponent', () => {
  let component: DispensationNominalViewComponent;
  let fixture: ComponentFixture<DispensationNominalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensationNominalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensationNominalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
