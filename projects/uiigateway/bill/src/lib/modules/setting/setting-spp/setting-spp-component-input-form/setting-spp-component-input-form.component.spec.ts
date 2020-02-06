import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSppComponentInputFormComponent } from './setting-spp-component-input-form.component';

describe('SettingSppComponentInputFormComponent', () => {
  let component: SettingSppComponentInputFormComponent;
  let fixture: ComponentFixture<SettingSppComponentInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingSppComponentInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSppComponentInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
