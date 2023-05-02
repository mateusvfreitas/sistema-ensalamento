import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../usuario/model/usuario';
import { UsuarioService } from '../usuario/usuario.service';
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
    displayedColumns: string[] = ['nome', 'responsaveis', 'moreActions'];
    dataSource = new MatTableDataSource<Curso>();

    listaUsuarios: Usuario[] = [];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        public dialog: MatDialog,
        private snackService: SnackbarService,
        private cursoService: CursoService,
        private usuarioService: UsuarioService
    ) {}

    ngOnInit(): void {
        this.listarCursos();
        this.listarUsuarios();
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
        this.usuarioService.setUsuarios(this.listaUsuarios);
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

    listarUsuarios(): void {
        this.usuarioService.listarUsuarios().subscribe((response) => {
            this.listaUsuarios = response;
            this.listaUsuarios.sort((a, b) => (a.nome < b.nome ? -1 : 1));
        });
    }
}
