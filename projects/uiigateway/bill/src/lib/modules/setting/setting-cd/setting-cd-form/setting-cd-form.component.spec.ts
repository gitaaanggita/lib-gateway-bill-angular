import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCdFormComponent } from './setting-cd-form.component';

describe('SettingCdFormComponent', () => {
  let component: SettingCdFormComponent;
  let fixture: ComponentFixture<SettingCdFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingCdFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingCdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
