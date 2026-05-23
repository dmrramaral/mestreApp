import { TestBed } from '@angular/core/testing';

import { MercadoService } from './mercado.service';

describe('MercadoService', () => {
  let service: MercadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MercadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
