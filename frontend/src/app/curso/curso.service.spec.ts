import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CursoService } from './curso.service';

describe('CursoService', () => {
  let service: CursoService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CursoService],
      imports: [HttpClientTestingModule]
      
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
