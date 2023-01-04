import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppApi } from '../appApi';

@Injectable({
    providedIn: 'root',
})
export class GrupoSalaService {
    constructor(private http: HttpClient) {}

    listarGrupos(): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/grupo-salas`);
    }

    consultarGrupoPorId(id: any): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/grupo-salas/${id}`);
    }

    salvarNovoGrupo(novoGrupo: any): Observable<any> {
        return this.http.post(`${AppApi.BASE_URL}/grupo-salas`, novoGrupo);
    }

    deletarGrupo(id: any): Observable<any> {
        return this.http.delete(`${AppApi.BASE_URL}/grupo-salas/${id}`);
    }

    updateGrupo(id: any, data: any) {
        return this.http.put(`${AppApi.BASE_URL}/grupo-salas/${id}`, data);
    }
}
