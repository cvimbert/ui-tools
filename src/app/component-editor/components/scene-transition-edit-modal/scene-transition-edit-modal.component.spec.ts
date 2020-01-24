import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneTransitionEditModalComponent } from './scene-transition-edit-modal.component';

describe('SceneTransitionEditModalComponent', () => {
  let component: SceneTransitionEditModalComponent;
  let fixture: ComponentFixture<SceneTransitionEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneTransitionEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneTransitionEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
