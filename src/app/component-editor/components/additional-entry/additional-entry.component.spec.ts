import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalEntryComponent } from './additional-entry.component';

describe('AdditionalEntryComponent', () => {
  let component: AdditionalEntryComponent;
  let fixture: ComponentFixture<AdditionalEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
