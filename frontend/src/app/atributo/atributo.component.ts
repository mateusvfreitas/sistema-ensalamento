import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../utils/snackbar.service';
import { AtributoModalComponent } from './atributo-modal/atributo-modal.component';
import { AtributoService } from './atributo.service';
import { Atributo } from './model/atributo';

@Component({
    selector: 'app-atributo',
    templateUrl: './atributo.component.html',
    styleUrls: ['./atributo.component.scss'],
})
export class AtributoComponent implements OnInit {
    displayedColumns: string[] = ['nome', 'moreActions'];
    dataSource = new MatTableDataSource<Atributo>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        public dialog: MatDialog,
        private snackService: SnackbarService,
        private atributoService: AtributoService
    ) {}

    ngOnInit(): void {
        this.listarAtributos();
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

    openDialog(atributoSalaToUpdate: any) {
        const dialogRef = this.dialog.open(AtributoModalComponent, {
            width: '500px',
            data: atributoSalaToUpdate,
        });

        dialogRef.afterClosed().subscribe(() => this.listarAtributos());
    }

    listarAtributos(): void {
        this.atributoService.listarAtributos().subscribe((response) => {
            this.dataSource.data = response as Atributo[];
        });
    }

    consultarAtributoPorId(id: any) {
        this.atributoService
            .consultarAtributoPorId(id)
            .subscribe((response) => {
                this.openDialog(response);
            });
    }

    deletarAtributo(id: any): void {
        this.atributoService.deletarAtributo(id).subscribe((response) => {
            this.listarAtributos();
            this.snackService.openSnackbar('Atributo deletado', true);
        });
    }
}
