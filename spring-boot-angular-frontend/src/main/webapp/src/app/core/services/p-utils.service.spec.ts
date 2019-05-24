import { TestBed } from '@angular/core/testing';

import { PUtilsService } from './p-utils.service';

describe('PUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PUtilsService = TestBed.get(PUtilsService);
    expect(service).toBeTruthy();
  });
});
