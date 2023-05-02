import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppApi } from '../appApi';

@Injectable({
    providedIn: 'root',
})
export class BlocoAulaService {
    constructor(private http: HttpClient) {}

    listarBlocosAula(): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/blocos-aula`);
    }

    consultarBlocoAulaPorId(id: any): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/blocos-aula/${id}`);
    }

    salvarNovoBlocoAula(novoBlocoAula: any): Observable<any> {
        return this.http.post(`${AppApi.BASE_URL}/blocos-aula`, novoBlocoAula);
    }

    deletarBlocoAula(id: any): Observable<any> {
        return this.http.delete(`${AppApi.BASE_URL}/blocos-aula/${id}`);
    }

    updateBlocoAula(id: any, data: any) {
        return this.http.put(`${AppApi.BASE_URL}/blocos-aula/${id}`, data);
    }
}
