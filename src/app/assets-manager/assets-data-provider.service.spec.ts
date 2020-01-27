import { TestBed } from '@angular/core/testing';

import { AssetsDataProviderService } from './assets-data-provider.service';

describe('AssetsDataProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetsDataProviderService = TestBed.get(AssetsDataProviderService);
    expect(service).toBeTruthy();
  });
});
