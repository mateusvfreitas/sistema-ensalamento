import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AppApi } from 'src/app/appApi';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    constructor(private http: HttpClient) {}

    listarUsuarios(): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/usuarios`);
    }

    salvarNovoUsuario(novoUsuario: any): Observable<any> {
        return this.http.post(`${AppApi.BASE_URL}/usuarios`, novoUsuario);
    }

    deletarUsuario(id: any): Observable<any> {
        return this.http.delete(`${AppApi.BASE_URL}/usuarios/${id}`);
    }

    updateUsuario(id: any, data: any) {
        return this.http.put(`${AppApi.BASE_URL}/usuarios/${id}`, data);
    }
}