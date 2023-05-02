import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppApi } from 'src/app/appApi';
import { HorarioAula } from './model/horario-aula';

@Injectable({
    providedIn: 'root',
})
export class HorarioService {
    private listaHorarios!: HorarioAula[];

    constructor(private http: HttpClient) {}

    listarHorarios(): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/horarios`);
    }

    consultarHorarioPorId(id: any): Observable<any> {
        return this.http.get(`${AppApi.BASE_URL}/horarios/${id}`);
    }

    salvarNovoHorario(novoHorario: any): Observable<any> {
        return this.http.post(`${AppApi.BASE_URL}/horarios`, novoHorario);
    }

    deletarHorario(id: any): Observable<any> {
        return this.http.delete(`${AppApi.BASE_URL}/horarios/${id}`);
    }

    updateHorario(id: any, data: any) {
        return this.http.put(`${AppApi.BASE_URL}/horarios/${id}`, data);
    }

    setHorarios(horarios: HorarioAula[]) {
        this.listaHorarios = horarios;
    }

    getHorarios(): HorarioAula[] {
        return this.listaHorarios;
    }
}
