import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GrupoSalaService } from './grupo-sala.service';

describe('GrupoSalaService', () => {
  let service: GrupoSalaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrupoSalaService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GrupoSalaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
