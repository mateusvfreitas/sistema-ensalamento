import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/utils/snackbar.service';
import { CursoComponent } from '../curso.component';
import { CursoService } from '../curso.service';

@Component({
    selector: 'app-curso-modal',
    templateUrl: './curso-modal.component.html',
    styleUrls: ['./curso-modal.component.scss'],
})
export class CursoModalComponent implements OnInit {
    nome = new FormControl('', [Validators.required]);

    cursoDialogContent!: any;

    constructor(
        private cursoService: CursoService,
        private snackService: SnackbarService,
        public dialogRef: MatDialogRef<CursoComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.cursoDialogContent = data;
    }

    ngOnInit(): void {
        if (this.cursoDialogContent !== null) {
            this.nome.setValue(this.cursoDialogContent.nome);
        }
    }

    clearForm(): void {
        this.nome.setValue('');
    }

    saveOrUpdateDecider(): void {
        if (this.cursoDialogContent === null) {
            this.salvarCurso();
        } else {
            this.updateCurso();
        }
    }

    wrapCurso() {
        let curso = {
            nome: this.nome.value,
        };
        return curso;
    }

    salvarCurso(): void {
        if (this.nome.hasError('required')) {
            this.snackService.openSnackbar(
                'Pendência de campos obrigatórios',
                false
            );
        } else {
            this.cursoService
                .salvarNovoCurso(this.wrapCurso())
                .subscribe(() => {
                    this.dialogRef.close();
                    this.snackService.openSnackbar(
                        'Curso criado com sucesso',
                        true
                    );
                });
        }
    }

    updateCurso() {
        this.cursoService
            .updateCurso(this.cursoDialogContent.id, this.wrapCurso())
            .subscribe(() => {
                this.dialogRef.close();
                this.snackService.openSnackbar(
                    'Curso editado com sucesso',
                    true
                );
            });
    }
}
