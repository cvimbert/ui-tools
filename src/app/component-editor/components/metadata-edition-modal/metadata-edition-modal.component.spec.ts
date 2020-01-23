import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataEditionModalComponent } from './metadata-edition-modal.component';

describe('MetadataEditionModalComponent', () => {
  let component: MetadataEditionModalComponent;
  let fixture: ComponentFixture<MetadataEditionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataEditionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataEditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
