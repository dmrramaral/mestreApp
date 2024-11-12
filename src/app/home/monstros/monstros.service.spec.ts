import { TestBed } from '@angular/core/testing';

import { MonstrosService } from './monstros.service';

describe('MonstrosService', () => {
  let service: MonstrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonstrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
