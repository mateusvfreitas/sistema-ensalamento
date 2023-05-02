import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppApi } from '../appApi';
import { Atributo } from './model/atributo';

@Injectable({
    providedIn: 'root',
})
export class AtributoService {
    private listaAtributos!: Atributo[];

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

    setAtributos(atributos: Atributo[]) {
        this.listaAtributos = atributos;
    }

    getAtributos(): Atributo[] {
        return this.listaAtributos;
    }
}
