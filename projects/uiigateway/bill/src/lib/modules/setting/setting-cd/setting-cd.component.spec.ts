import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCdComponent } from './setting-cd.component';

describe('SettingCdComponent', () => {
  let component: SettingCdComponent;
  let fixture: ComponentFixture<SettingCdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingCdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
