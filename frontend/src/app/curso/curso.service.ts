import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppApi } from '../appApi';
import { Curso } from './model/curso';

@Injectable({
    providedIn: 'root',
})
export class CursoService {
    private listaCursos!: Curso[];

    constructor(private http: HttpClient) {}

    listarCursos(): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/cursos`);
    }

    consultarCursoPorId(id: any): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/cursos/${id}`);
    }

    salvarNovoCurso(novoCurso: any): Observable<any> {
        return this.http.post(`${AppApi.BASE_URL}/cursos`, novoCurso);
    }

    deletarCurso(id: any): Observable<any> {
        return this.http.delete(`${AppApi.BASE_URL}/cursos/${id}`);
    }

    updateCurso(id: any, data: any) {
        return this.http.put(`${AppApi.BASE_URL}/cursos/${id}`, data);
    }

    setCursos(cursos: Curso[]) {
        this.listaCursos = cursos;
    }

    getCursos(): Curso[] {
        return this.listaCursos;
    }
}
