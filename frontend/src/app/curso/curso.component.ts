import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../utils/snackbar.service';
import { CursoModalComponent } from './curso-modal/curso-modal.component';
import { CursoService } from './curso.service';
import { Curso } from './model/curso';

@Component({
    selector: 'app-curso',
    templateUrl: './curso.component.html',
    styleUrls: ['./curso.component.scss'],
})
export class CursoComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['nome', 'moreActions'];
    dataSource = new MatTableDataSource<Curso>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        public dialog: MatDialog,
        private snackService: SnackbarService,
        private cursoService: CursoService
    ) {}

    ngOnInit(): void {
        this.listarCursos();
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

    openDialog(cursoToUpdate: any) {
        const dialogRef = this.dialog.open(CursoModalComponent, {
            width: '500px',
            data: cursoToUpdate,
        });

        dialogRef.afterClosed().subscribe(() => this.listarCursos());
    }

    listarCursos(): void {
        this.cursoService.listarCursos().subscribe((response) => {
            this.dataSource.data = response as Curso[];
        });
    }

    consultarCursoPorId(id: any) {
        this.cursoService.consultarCursoPorId(id).subscribe((response) => {
            this.openDialog(response);
        });
    }

    deletarCurso(id: any): void {
        this.cursoService.deletarCurso(id).subscribe((response) => {
            this.listarCursos();
            this.snackService.openSnackbar('Curso deletado', true);
        });
    }
}
