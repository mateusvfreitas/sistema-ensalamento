import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AtributoService } from './atributo.service';

describe('AtributoService', () => {
    let service: AtributoService;
    let httpTestingController: HttpTestingController;


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AtributoService],
      imports: [HttpClientTestingModule]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(AtributoService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
