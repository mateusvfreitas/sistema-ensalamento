import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GrupoSalaModalComponent } from '../grupo-sala/grupo-sala-modal/grupo-sala-modal.component';
import { GrupoSalaService } from '../grupo-sala/grupo-sala.service';
import { GrupoSala } from '../grupo-sala/model/grupo-sala';
import { FILTRO_NOME } from '../utils/filtros';
import { SnackbarService } from '../utils/snackbar.service';

@Component({
    selector: 'app-grupo-sala',
    templateUrl: './grupo-sala.component.html',
    styleUrls: ['./grupo-sala.component.scss'],
})
export class GrupoSalaComponent implements OnInit {
    displayedColumns: string[] = ['nome', 'moreActions'];
    dataSource = new MatTableDataSource<GrupoSala>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        public dialog: MatDialog,
        private snackService: SnackbarService,
        private grupoSalaService: GrupoSalaService
    ) {}

    ngOnInit(): void {
        this.listarGrupoSalas();
    }

    ngAfterViewInit() {
        this.setSort({ active: 'nome', direction: 'asc' });
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    setSort(sortState: Sort) {
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openDialog(grupoSalaToUpdate: any) {
        const dialogRef = this.dialog.open(GrupoSalaModalComponent, {
            width: '500px',
            data: grupoSalaToUpdate,
        });

        dialogRef.afterClosed().subscribe(() => this.listarGrupoSalas());
    }

    listarGrupoSalas(): void {
        this.grupoSalaService.listarGrupos().subscribe((response) => {
            this.dataSource.data = response as GrupoSala[];
            FILTRO_NOME.filtrarPorTexto(this.dataSource);
        });
    }

    consultarGrupoSalaPorId(id: any) {
        this.grupoSalaService.consultarGrupoPorId(id).subscribe((response) => {
            this.openDialog(response);
        });
    }

    deletarGrupoSala(id: any): void {
        this.grupoSalaService.deletarGrupo(id).subscribe((response) => {
            this.listarGrupoSalas();
            this.snackService.openSnackbar('GrupoSala deletado', true);
        });
    }
}
