import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../utils/snackbar.service';
import { HorarioModalComponent } from './horario-modal/horario-modal.component';
import { HorarioService } from './horario.service';
import { HorarioAula } from './model/horario-aula';

@Component({
    selector: 'app-horario',
    templateUrl: './horario.component.html',
    styleUrls: ['./horario.component.scss'],
})
export class HorarioComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'nome',
        'horarioInicio',
        'horarioFim',
        'moreActions',
    ];
    dataSource = new MatTableDataSource<HorarioAula>();

    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        public dialog: MatDialog,
        private snackService: SnackbarService,
        private horarioService: HorarioService
    ) {}

    ngOnInit(): void {
        this.listarHorarios();
    }

    ngAfterViewInit() {
        this.setSort({ active: 'nome', direction: 'asc' });
        this.dataSource.sort = this.sort;
    }

    setSort(sortState: Sort) {
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.dataSource.sort = this.sort;
    }

    openDialog(horarioToUpdate: any) {
        const dialogRef = this.dialog.open(HorarioModalComponent, {
            width: '500px',
            data: horarioToUpdate,
        });

        dialogRef.afterClosed().subscribe(() => this.listarHorarios());
    }

    listarHorarios(): void {
        this.horarioService.listarHorarios().subscribe((response) => {
            response.forEach((element: any) => {
                element.horarioInicio = element.horarioInicio.slice(0, 5);
                element.horarioFim = element.horarioFim.slice(0, 5);
            });

            this.dataSource.data = response as HorarioAula[];
        });
    }

    consultarHorarioPorId(id: any) {
        this.horarioService.consultarHorarioPorId(id).subscribe((response) => {
            this.openDialog(response);
        });
    }

    deletarHorario(id: any): void {
        this.horarioService.deletarHorario(id).subscribe((response) => {
            this.listarHorarios();
            this.snackService.openSnackbar('Horário de aula deletado', true);
        });
    }
}
