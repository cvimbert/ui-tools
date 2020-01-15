import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneSizeModalComponent } from './scene-size-modal.component';

describe('SceneSizeModalComponent', () => {
  let component: SceneSizeModalComponent;
  let fixture: ComponentFixture<SceneSizeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneSizeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneSizeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
