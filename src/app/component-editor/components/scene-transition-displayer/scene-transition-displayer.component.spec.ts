import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneTransitionDisplayerComponent } from './scene-transition-displayer.component';

describe('SceneTransitionDisplayerComponent', () => {
  let component: SceneTransitionDisplayerComponent;
  let fixture: ComponentFixture<SceneTransitionDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneTransitionDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneTransitionDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
