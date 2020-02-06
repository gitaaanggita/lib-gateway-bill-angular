import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensationListComponent } from './dispensation-list.component';

describe('DispensationListComponent', () => {
  let component: DispensationListComponent;
  let fixture: ComponentFixture<DispensationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
