import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AtributoComponent } from 'src/app/atributo/atributo.component';
import { AtributoService } from 'src/app/atributo/atributo.service';
import { SnackbarService } from 'src/app/utils/snackbar.service';

@Component({
    selector: 'app-atributo-modal',
    templateUrl: './atributo-modal.component.html',
    styleUrls: ['./atributo-modal.component.scss'],
})
export class AtributoModalComponent implements OnInit {
    nome = new FormControl('', [Validators.required]);

    atributoDialogContent!: any;

    constructor(
        private atributoService: AtributoService,
        private snackService: SnackbarService,
        public dialogRef: MatDialogRef<AtributoComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.atributoDialogContent = data;
    }

    ngOnInit(): void {
        if (this.atributoDialogContent !== null) {
            this.nome.setValue(this.atributoDialogContent.nome);
        }
    }

    clearForm(): void {
        this.nome.setValue('');
    }

    saveOrUpdateDecider(): void {
        if (this.atributoDialogContent === null) {
            this.salvaratributo();
        } else {
            this.updateatributo();
        }
    }

    wrapatributo() {
        let atributo = {
            nome: this.nome.value,
        };
        return atributo;
    }

    salvaratributo(): void {
        if (this.nome.hasError('required')) {
            this.snackService.openSnackbar(
                'Pendência de campos obrigatórios',
                false
            );
        } else {
            this.atributoService
                .salvarNovoAtributo(this.wrapatributo())
                .subscribe(() => {
                    this.dialogRef.close();
                    this.snackService.openSnackbar(
                        'Atributo criado com sucesso',
                        true
                    );
                });
        }
    }

    updateatributo() {
        this.atributoService
            .updateAtributo(this.atributoDialogContent.id, this.wrapatributo())
            .subscribe(() => {
                this.dialogRef.close();
                this.snackService.openSnackbar(
                    'Atributo editado com sucesso',
                    true
                );
            });
    }
}
