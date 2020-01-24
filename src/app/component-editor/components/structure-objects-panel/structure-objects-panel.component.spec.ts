import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureObjectsPanelComponent } from './structure-objects-panel.component';

describe('StructureObjectsPanelComponent', () => {
  let component: StructureObjectsPanelComponent;
  let fixture: ComponentFixture<StructureObjectsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureObjectsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureObjectsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
