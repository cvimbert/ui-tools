import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTreePanelComponent } from './component-tree-panel.component';

describe('ComponentTreePanelComponent', () => {
  let component: ComponentTreePanelComponent;
  let fixture: ComponentFixture<ComponentTreePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentTreePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentTreePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
