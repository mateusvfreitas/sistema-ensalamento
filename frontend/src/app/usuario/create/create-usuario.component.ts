import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/utils/snackbar.service';
import { UsuarioService } from '../usuario.service';

@Component({
    selector: 'app-create-usuario',
    templateUrl: './create-usuario.component.html',
    styleUrls: ['./create-usuario.component.scss'],
})
export class CreateUsuarioComponent implements OnInit {
    nome = new FormControl('', [Validators.required]);
    email = new FormControl('', [Validators.required, Validators.email]);
    permissao = new FormControl('simples');

    usuarioDialogContent!: any;

    onAdd = new EventEmitter();

    constructor(
        private usuarioService: UsuarioService,
        private snackService: SnackbarService,
        public dialogRef: MatDialogRef<CreateUsuarioComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.usuarioDialogContent = data;
    }

    ngOnInit(): void {
        if (this.usuarioDialogContent !== null) {
            this.nome.setValue(this.usuarioDialogContent.nome);
            this.email.setValue(this.usuarioDialogContent.email);
            this.permissao.setValue(
                this.usuarioDialogContent.isAdmin === false
                    ? 'simples'
                    : 'completo'
            );
        }
    }

    clearForm() {
        this.nome.setValue('');
        this.email.setValue('');
        this.permissao.setValue('simples');
    }

    saveOrUpdateDecider() {
        if (this.usuarioDialogContent === null) {
            this.salvarUsuario();
        } else {
            this.updateUsuario();
        }
    }

    wrapUsuario() {
        let usuario = {
            nome: this.nome.value,
            email: this.email.value,
            isAdmin: this.permissao.value == 'simples' ? false : true,
        };
        return usuario;
    }

    salvarUsuario() {
        if (
            this.nome.hasError('required') ||
            this.email.hasError('required') ||
            this.email.hasError('email')
        ) {
            this.snackService.openSnackbar(
                'Pendência de campos obrigatórios',
                false
            );
        } else {
            this.usuarioService
                .salvarNovoUsuario(this.wrapUsuario())
                .subscribe(() => {
                    this.dialogRef.close();
                    this.snackService.openSnackbar(
                        'Usuário criado com sucesso',
                        true
                    );
                });
        }
    }

    updateUsuario() {
        this.usuarioService
            .updateUsuario(this.usuarioDialogContent.id, this.wrapUsuario())
            .subscribe(() => {
                this.dialogRef.close();
                this.snackService.openSnackbar(
                    'Usuário editado com sucesso',
                    true
                );
            });
    }
}
