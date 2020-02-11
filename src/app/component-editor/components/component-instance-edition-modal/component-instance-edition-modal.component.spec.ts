import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentInstanceEditionModalComponent } from './component-instance-edition-modal.component';

describe('ComponentInstanceEditionModalComponent', () => {
  let component: ComponentInstanceEditionModalComponent;
  let fixture: ComponentFixture<ComponentInstanceEditionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentInstanceEditionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentInstanceEditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
