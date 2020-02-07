import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreePanelSectionComponent } from './tree-panel-section.component';

describe('TreePanelSectionComponent', () => {
  let component: TreePanelSectionComponent;
  let fixture: ComponentFixture<TreePanelSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreePanelSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreePanelSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
