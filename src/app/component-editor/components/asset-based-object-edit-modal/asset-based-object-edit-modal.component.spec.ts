import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetBasedObjectEditModalComponent } from './asset-based-object-edit-modal.component';

describe('AssetBasedObjectEditModalComponent', () => {
  let component: AssetBasedObjectEditModalComponent;
  let fixture: ComponentFixture<AssetBasedObjectEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetBasedObjectEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetBasedObjectEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
