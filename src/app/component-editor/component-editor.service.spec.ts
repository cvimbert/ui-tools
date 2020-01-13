import { TestBed } from '@angular/core/testing';

import { ComponentEditorService } from './component-editor.service';

describe('ComponentEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentEditorService = TestBed.get(ComponentEditorService);
    expect(service).toBeTruthy();
  });
});
