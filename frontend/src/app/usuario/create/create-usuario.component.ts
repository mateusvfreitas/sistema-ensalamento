import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    idUsuario!: any;

    onAdd = new EventEmitter();

    constructor(
        private usuarioService: UsuarioService,
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
            console.log(Error);
        } else {
            this.usuarioService
                .salvarNovoUsuario(this.wrapUsuario())
                .subscribe((response) => {
                    console.log('POST OK');
                    this.onAdd.emit(response);
                    this.clearForm();
                });
        }
    }

    updateUsuario() {
        this.usuarioService
            .updateUsuario(this.usuarioDialogContent.id, this.wrapUsuario())
            .subscribe((response) => {
                console.log('UPDATE OK');
                this.onAdd.emit(response);
            });
    }
}
