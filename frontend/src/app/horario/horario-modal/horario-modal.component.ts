import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/utils/snackbar.service';
import { HorarioComponent } from '../horario.component';
import { HorarioService } from '../horario.service';

@Component({
    selector: 'app-horario-modal',
    templateUrl: './horario-modal.component.html',
    styleUrls: ['./horario-modal.component.scss'],
})
export class HorarioModalComponent implements OnInit {
    nome = new FormControl('', [Validators.required]);
    horarioInicio = new FormControl('', [Validators.required]);
    horarioFim = new FormControl('', [Validators.required]);

    horarioDialogContent!: any;
    onAdd = new EventEmitter();

    constructor(
        private horarioService: HorarioService,
        private snackService: SnackbarService,
        public dialogRef: MatDialogRef<HorarioComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        this.horarioDialogContent = data;
    }

    ngOnInit(): void {
        if (this.horarioDialogContent !== null) {
            this.nome.setValue(this.horarioDialogContent.nome);
            this.horarioInicio.setValue(
                this.horarioDialogContent.horarioInicio
            );
            this.horarioFim.setValue(this.horarioDialogContent.horarioFim);
        }
    }

    clearForm(): void {
        this.nome.setValue('');
        this.horarioInicio.setValue('');
        this.horarioFim.setValue('');
    }

    saveOrUpdateDecider(): void {
        if (this.horarioDialogContent === null) {
            this.salvarHorario();
        } else {
            this.updateHorario();
        }
    }

    wrapHorario() {
        let horario = {
            nome: this.nome.value,
            horarioInicio: this.horarioInicio.value,
            horarioFim: this.horarioFim.value,
        };
        return horario;
    }

    salvarHorario(): void {
        if (
            this.nome.hasError('required') ||
            this.horarioInicio.hasError('required') ||
            this.horarioFim.hasError('required')
        ) {
            console.log(Error);
        } else {
            this.horarioService
                .salvarNovoHorario(this.wrapHorario())
                .subscribe(() => {
                    this.dialogRef.close();
                    this.snackService.openSnackbar(
                        'Horário de aula criado com sucesso',
                        true
                    );
                });
        }
    }

    updateHorario() {
        this.horarioService
            .updateHorario(this.horarioDialogContent.id, this.wrapHorario())
            .subscribe(() => {
                this.dialogRef.close();
                this.snackService.openSnackbar(
                    'Horário de aula editado com sucesso',
                    true
                );
            });
    }
}
