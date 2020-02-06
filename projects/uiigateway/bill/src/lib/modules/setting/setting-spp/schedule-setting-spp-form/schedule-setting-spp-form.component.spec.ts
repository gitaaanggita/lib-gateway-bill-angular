import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSettingSppFormComponent } from './schedule-setting-spp-form.component';

describe('ScheduleSettingSppFormComponent', () => {
  let component: ScheduleSettingSppFormComponent;
  let fixture: ComponentFixture<ScheduleSettingSppFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleSettingSppFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSettingSppFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
