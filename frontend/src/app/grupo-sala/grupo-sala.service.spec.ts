import { TestBed } from '@angular/core/testing';

import { GrupoSalaService } from './grupo-sala.service';

describe('GrupoSalaService', () => {
  let service: GrupoSalaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoSalaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
