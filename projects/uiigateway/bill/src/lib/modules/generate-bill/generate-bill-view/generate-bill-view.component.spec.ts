import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBillViewComponent } from './generate-bill-view.component';

describe('GenerateBillViewComponent', () => {
  let component: GenerateBillViewComponent;
  let fixture: ComponentFixture<GenerateBillViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateBillViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateBillViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
