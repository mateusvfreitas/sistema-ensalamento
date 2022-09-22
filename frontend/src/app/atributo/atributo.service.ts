import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppApi } from '../appApi';

@Injectable({
    providedIn: 'root',
})
export class AtributoService {
    constructor(private http: HttpClient) {}

    listarAtributos(): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/atributos`);
    }

    consultarAtributoPorId(id: any): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/atributos/${id}`);
    }

    salvarNovoAtributo(novoAtributo: any): Observable<any> {
        return this.http.post(`${AppApi.BASE_URL}/atributos`, novoAtributo);
    }

    deletarAtributo(id: any): Observable<any> {
        return this.http.delete(`${AppApi.BASE_URL}/atributos/${id}`);
    }

    updateAtributo(id: any, data: any) {
        return this.http.put(`${AppApi.BASE_URL}/atributos/${id}`, data);
    }
}
