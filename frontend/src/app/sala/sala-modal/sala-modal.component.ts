import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AtributoService } from 'src/app/atributo/atributo.service';
import { Atributo } from 'src/app/atributo/model/atributo';
import { GrupoSalaService } from 'src/app/grupo-sala/grupo-sala.service';
import { GrupoSala } from 'src/app/grupo-sala/model/grupo-sala';
import { SnackbarService } from 'src/app/utils/snackbar.service';
import { Sala } from '../model/sala';
import { SalaService } from '../sala.service';

@Component({
    selector: 'app-sala-modal',
    templateUrl: './sala-modal.component.html',
    styleUrls: ['./sala-modal.component.scss'],
})
export class SalaModalComponent implements OnInit {
    nome = new FormControl('', [Validators.required]);
    capacidade = new FormControl('', [Validators.required]);
    agrupamento = new FormControl<GrupoSala | undefined>(
        undefined,
        Validators.required
    );
    atributos = new FormControl<Atributo[] | undefined>(undefined, [
        Validators.required,
    ]);
    isExclusiva = false;
    isLiberar = false;

    listaAtributos!: Atributo[];
    listaAgrupamentos!: GrupoSala[];
    seila: string[] = [];

    salaDialogContent!: Sala;

    constructor(
        public atributoService: AtributoService,
        public grupoSalaService: GrupoSalaService,
        private snackService: SnackbarService,
        private salaService: SalaService,
        public dialogRef: MatDialogRef<SalaModalComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.salaDialogContent = data;
    }

    ngOnInit(): void {
        this.listaAtributos = this.atributoService.getAtributos();
        this.listaAgrupamentos = this.grupoSalaService.getAgrupamentos();

        if (this.salaDialogContent != null) {
            const selectedAgrupamento = this.listaAgrupamentos.find(
                (c) => c.id == this.salaDialogContent.grupoSala.id
            );
            const selectedAtributos = this.listaAtributos.filter((elem) => {
                return JSON.stringify(
                    this.salaDialogContent.atributos
                ).includes(JSON.stringify(elem));
            });

            this.nome.setValue(this.salaDialogContent.nome);
            this.capacidade.setValue(
                this.salaDialogContent.capacidade.toString()
            );
            this.agrupamento.setValue(selectedAgrupamento);
            this.atributos.setValue(selectedAtributos);
            this.isExclusiva = this.salaDialogContent.isExclusiva;
            this.isLiberar = this.salaDialogContent.isLiberar;
        }
    }

    teste() {
        console.log(this.salaDialogContent);
    }

    saveOrUpdateDecider() {
        if (this.salaDialogContent === null) {
            this.salvarSala();
        } else {
            this.updateSala();
        }
    }

    wrapSala() {
        let sala = {
            nome: this.nome.value,
            capacidade: this.capacidade.value,
            grupoSala: this.agrupamento.value,
            atributos: this.atributos.value,
            isLiberar: this.isLiberar,
            isExclusiva: this.isExclusiva,
        };
        return sala;
    }

    salvarSala() {
        if (
            this.nome.hasError('required') ||
            this.capacidade.hasError('required') ||
            this.agrupamento.hasError('required') ||
            this.atributos.hasError('required')
        ) {
            this.snackService.openSnackbar(
                'Pendência de campos obrigatórios',
                false
            );
        } else {
            this.salaService.salvarNovaSala(this.wrapSala()).subscribe(() => {
                this.dialogRef.close();
                this.snackService.openSnackbar('Sala criada com sucesso', true);
            });
        }
    }

    updateSala() {
        this.salaService
            .updateSala(this.salaDialogContent.id, this.wrapSala())
            .subscribe(() => {
                this.dialogRef.close();
                this.snackService.openSnackbar(
                    'Sala editada com sucesso',
                    true
                );
            });
    }
}
