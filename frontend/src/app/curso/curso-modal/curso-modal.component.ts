import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/usuario/model/usuario';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { SnackbarService } from 'src/app/utils/snackbar.service';
import { CursoComponent } from '../curso.component';
import { CursoService } from '../curso.service';
import { Curso } from '../model/curso';

@Component({
    selector: 'app-curso-modal',
    templateUrl: './curso-modal.component.html',
    styleUrls: ['./curso-modal.component.scss'],
})
export class CursoModalComponent implements OnInit {
    nome = new FormControl('', [Validators.required]);
    usuarios = new FormControl<Usuario[] | undefined>(undefined, [
        Validators.required,
    ]);

    listaUsuarios!: Usuario[];

    cursoDialogContent!: Curso;

    constructor(
        private cursoService: CursoService,
        private snackService: SnackbarService,
        public dialogRef: MatDialogRef<CursoComponent>,
        private usuarioService: UsuarioService,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.cursoDialogContent = data;
    }

    ngOnInit(): void {
        this.listaUsuarios = this.usuarioService.getUsuarios();

        if (this.cursoDialogContent !== null) {
            const selectedUsuarios = this.listaUsuarios.filter((elem) => {
                return JSON.stringify(
                    this.cursoDialogContent.usuarios
                ).includes(JSON.stringify(elem));
            });

            this.nome.setValue(this.cursoDialogContent.nome);
            this.usuarios.setValue(selectedUsuarios);
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
