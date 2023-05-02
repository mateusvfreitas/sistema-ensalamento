import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AtributoService } from 'src/app/atributo/atributo.service';
import { Atributo } from 'src/app/atributo/model/atributo';
import { CursoService } from 'src/app/curso/curso.service';
import { Curso } from 'src/app/curso/model/curso';
import { HorarioService } from 'src/app/horario/horario.service';
import { HorarioAula } from 'src/app/horario/model/horario-aula';
import { Sala } from 'src/app/sala/model/sala';
import { SalaService } from 'src/app/sala/sala.service';
import { DiaSemana } from 'src/app/utils/dia-semana';
import { SnackbarService } from 'src/app/utils/snackbar.service';
import { BlocoAulaService } from '../bloco-aula.service';
import { BlocoAula } from '../model/bloco-aula';

@Component({
    selector: 'app-bloco-aula-modal',
    templateUrl: './bloco-aula-modal.component.html',
    styleUrls: ['./bloco-aula-modal.component.scss'],
})
export class BlocoAulaModalComponent implements OnInit {
    disciplina = new FormControl('', [Validators.required]);
    turma = new FormControl('', [Validators.required]);
    curso = new FormControl<Curso | undefined>(undefined, Validators.required);
    salaEspecifica = new FormControl<Sala | undefined>(
        undefined,
        Validators.required
    );
    salaAtual = new FormControl<Sala | undefined>(
        undefined,
        Validators.required
    );
    diaSemana = new FormControl<DiaSemana | undefined>(
        undefined,
        Validators.required
    );
    horarioInicio = new FormControl<HorarioAula | undefined>(
        undefined,
        Validators.required
    );
    horarioFim = new FormControl<HorarioAula | undefined>(
        undefined,
        Validators.required
    );
    atributos = new FormControl<Atributo[] | undefined>(undefined, [
        Validators.required,
    ]);

    listaAtributos!: Atributo[];
    listaCursos!: Curso[];
    listaHorarios!: HorarioAula[];
    listaDiasSemana = Object.values(DiaSemana);
    listaSalas!: Sala[];

    blocoAulaDialogContent!: BlocoAula;

    constructor(
        private atributoService: AtributoService,
        private cursoService: CursoService,
        private snackService: SnackbarService,
        private salaService: SalaService,
        private horarioService: HorarioService,
        private blocoAulaService: BlocoAulaService,
        public dialogRef: MatDialogRef<BlocoAulaModalComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.blocoAulaDialogContent = data;
    }

    ngOnInit(): void {
        this.listaAtributos = this.atributoService.getAtributos();
        this.listaCursos = this.cursoService.getCursos();
        this.listaHorarios = this.horarioService.getHorarios();
        this.listaSalas = this.salaService.getSalas();

        if (this.blocoAulaDialogContent != null) {
            const selectedCurso = this.listaCursos.find(
                (c) => c.id == this.blocoAulaDialogContent.curso.id
            );
            const selectedDiaSemana =
                DiaSemana[this.blocoAulaDialogContent.diaSemana];
            const selectedHorarioInicio = this.listaHorarios.find(
                (h) => h.id == this.blocoAulaDialogContent.horarioInicio.id
            );
            const selectedHorarioFim = this.listaHorarios.find(
                (h) => h.id == this.blocoAulaDialogContent.horarioFim.id
            );
            const selectedSalaEspecifica = this.listaSalas.find(
                (s) => s.id == this.blocoAulaDialogContent.salaEspecifica?.id
            );
            const selectedSalaAtual = this.listaSalas.find(
                (s) => s.id == this.blocoAulaDialogContent.salaAtual?.id
            );
            const selectedAtributos = this.listaAtributos.filter((elem) => {
                return JSON.stringify(
                    this.blocoAulaDialogContent.atributosSala
                ).includes(JSON.stringify(elem));
            });

            this.disciplina.setValue(this.blocoAulaDialogContent.disciplina);
            this.turma.setValue(this.blocoAulaDialogContent.turma);
            this.curso.setValue(selectedCurso);
            this.diaSemana.setValue(selectedDiaSemana);
            this.horarioInicio.setValue(selectedHorarioInicio);
            this.horarioFim.setValue(selectedHorarioFim);
            this.salaEspecifica.setValue(selectedSalaEspecifica);
            this.salaAtual.setValue(selectedSalaAtual);
            this.atributos.setValue(selectedAtributos);
        }
    }

    saveOrUpdateDecider() {
        if (this.blocoAulaDialogContent === null) {
            this.salvarBloco();
        } else {
            this.updateBloco();
        }
    }

    wrapBloco() {
        let bloco = {
            disciplina: this.disciplina.value,
            turma: this.turma.value,
            curso: this.curso.value,
            diaSemana: this.getDiaSemana(this.diaSemana.value!),
            horarioInicio: this.horarioInicio.value,
            horarioFim: this.horarioFim.value,
            salaEspecifica: this.salaEspecifica.value,
            salaAtual: this.salaAtual.value,
            atributosSala: this.atributos.value,
        };
        return bloco;
    }

    salvarBloco() {
        if (
            this.curso.hasError('required') ||
            this.disciplina.hasError('required') ||
            this.turma.hasError('required') ||
            this.atributos.hasError('required')
        ) {
            this.snackService.openSnackbar(
                'Pendência de campos obrigatórios',
                false
            );
        } else {
            this.blocoAulaService
                .salvarNovoBlocoAula(this.wrapBloco())
                .subscribe(() => {
                    this.dialogRef.close();
                    this.snackService.openSnackbar(
                        'Aula criada com sucesso',
                        true
                    );
                });
        }
    }

    updateBloco() {
        this.blocoAulaService
            .updateBlocoAula(this.blocoAulaDialogContent.id, this.wrapBloco())
            .subscribe(() => {
                this.dialogRef.close();
                this.snackService.openSnackbar(
                    'Aula editada com sucesso',
                    true
                );
            });
    }

    teste() {
        const eu = this.getDiaSemana(this.diaSemana.value!);
        console.log(eu);
    }

    getDiaSemana(diaSemana: DiaSemana): string {
        const indexOfS = Object.values(DiaSemana).indexOf(
            diaSemana as unknown as DiaSemana
        );

        const key = Object.keys(DiaSemana)[indexOfS];

        return key;
    }
}
