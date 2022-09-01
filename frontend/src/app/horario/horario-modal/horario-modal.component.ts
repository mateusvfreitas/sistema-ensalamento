import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-horario-modal',
    templateUrl: './horario-modal.component.html',
    styleUrls: ['./horario-modal.component.scss'],
})
export class HorarioModalComponent implements OnInit {
    nome = new FormControl('', [Validators.required]);
    horarioInicio = new FormControl('', [Validators.required]);
    horarioFim = new FormControl('', [Validators.required]);

    constructor() {}

    ngOnInit(): void {}

    salvar() {
        // console.log(this.horarioInicio);
    }
}
