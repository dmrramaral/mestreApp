import { TestBed } from '@angular/core/testing';

import { LocalStorageServcieService } from './local-storage-servcie.service';

describe('LocalStorageServcieService', () => {
  let service: LocalStorageServcieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageServcieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
