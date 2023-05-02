import { TestBed } from '@angular/core/testing';

import { BlocoAulaService } from './bloco-aula.service';

describe('BlocoAulaService', () => {
  let service: BlocoAulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlocoAulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
