import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/utils/snackbar.service';
import { GrupoSalaComponent } from '../grupo-sala.component';
import { GrupoSalaService } from '../grupo-sala.service';

@Component({
    selector: 'app-grupo-sala-modal',
    templateUrl: './grupo-sala-modal.component.html',
    styleUrls: ['./grupo-sala-modal.component.scss'],
})
export class GrupoSalaModalComponent implements OnInit {
    nome = new FormControl('', [Validators.required]);

    atributoDialogContent!: any;

    constructor(
        private atributoService: GrupoSalaService,
        private snackService: SnackbarService,
        public dialogRef: MatDialogRef<GrupoSalaComponent>,
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
            this.salvarGrupoSala();
        } else {
            this.updateatributo();
        }
    }

    wrapGrupoSala() {
        let atributo = {
            nome: this.nome.value,
        };
        return atributo;
    }

    salvarGrupoSala(): void {
        if (this.nome.hasError('required')) {
            this.snackService.openSnackbar(
                'Pendência de campos obrigatórios',
                false
            );
        } else {
            this.atributoService
                .salvarNovoGrupo(this.wrapGrupoSala())
                .subscribe(() => {
                    this.dialogRef.close();
                    this.snackService.openSnackbar(
                        'Agrupamento criado com sucesso',
                        true
                    );
                });
        }
    }

    updateatributo() {
        this.atributoService
            .updateGrupo(this.atributoDialogContent.id, this.wrapGrupoSala())
            .subscribe(() => {
                this.dialogRef.close();
                this.snackService.openSnackbar(
                    'Agrupamento editado com sucesso',
                    true
                );
            });
    }
}
