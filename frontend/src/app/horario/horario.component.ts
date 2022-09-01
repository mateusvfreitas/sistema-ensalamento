import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HorarioModalComponent } from './horario-modal/horario-modal.component';

@Component({
    selector: 'app-horario',
    templateUrl: './horario.component.html',
    styleUrls: ['./horario.component.scss'],
})
export class HorarioComponent implements OnInit {
    displayedColumns: string[] = ['nome', 'email', 'isAdmin', 'moreActions'];

    constructor(public dialog: MatDialog) {
        //do nothing
    }

    ngOnInit(): void {
        console.log('INIT');
    }

    openDialog() {
        const dialogRef = this.dialog.open(HorarioModalComponent, {
            width: '500px',
        });
    }
}
