import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCdViewComponent } from './setting-cd-view.component';

describe('SettingCdViewComponent', () => {
  let component: SettingCdViewComponent;
  let fixture: ComponentFixture<SettingCdViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingCdViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingCdViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
