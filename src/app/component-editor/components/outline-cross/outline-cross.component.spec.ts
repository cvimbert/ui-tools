import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlineCrossComponent } from './outline-cross.component';

describe('OutlineCrossComponent', () => {
  let component: OutlineCrossComponent;
  let fixture: ComponentFixture<OutlineCrossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutlineCrossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutlineCrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
