import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HorarioService } from './horario.service';

describe('HorarioService', () => {
  let service: HorarioService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HorarioService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HorarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
