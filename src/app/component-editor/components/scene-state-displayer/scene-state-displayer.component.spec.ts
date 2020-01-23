import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneStateDisplayerComponent } from './scene-state-displayer.component';

describe('SceneStateDisplayerComponent', () => {
  let component: SceneStateDisplayerComponent;
  let fixture: ComponentFixture<SceneStateDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneStateDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneStateDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
