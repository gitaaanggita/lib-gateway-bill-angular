import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSppComponent } from './setting-spp.component';

describe('SettingSppComponent', () => {
  let component: SettingSppComponent;
  let fixture: ComponentFixture<SettingSppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingSppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
