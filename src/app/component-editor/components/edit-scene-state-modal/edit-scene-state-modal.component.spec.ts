import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSceneStateModalComponent } from './edit-scene-state-modal.component';

describe('EditSceneStateModalComponent', () => {
  let component: EditSceneStateModalComponent;
  let fixture: ComponentFixture<EditSceneStateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSceneStateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSceneStateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
