import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, Observable, throwError } from 'rxjs';
import { AppApi } from 'src/app/appApi';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    constructor(private http: HttpClient) {}

    listarUsuarios(): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/usuarios`);
    }

    consultarUsuarioPorId(id: any): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/usuarios/${id}`);
    }

    salvarNovoUsuario(novoUsuario: any): Observable<any> {
        return this.http
            .post(`${AppApi.BASE_URL}/usuarios`, novoUsuario)
            .pipe(catchError(this.handleError));
    }

    deletarUsuario(id: any): Observable<any> {
        return this.http.delete(`${AppApi.BASE_URL}/usuarios/${id}`);
    }

    updateUsuario(id: any, data: any) {
        return this.http.put(`${AppApi.BASE_URL}/usuarios/${id}`, data);
    }

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                    `body was: ${error.error}`
            );
        }
        return throwError('Something bad happened; please try again later.');
    }
}
