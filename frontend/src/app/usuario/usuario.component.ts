import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from '../utils/snackbar.service';
import { CreateUsuarioComponent } from './create/create-usuario.component';

import { Usuario } from './model/usuario';
import { UsuarioService } from './usuario.service';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['nome', 'email', 'isAdmin', 'moreActions'];
    dataSource = new MatTableDataSource<Usuario>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        public dialog: MatDialog,
        private snackService: SnackbarService,
        private usuarioService: UsuarioService
    ) {}

    ngOnInit(): void {
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

    openDialog(usuarioToUpdate: any) {
        const dialogRef = this.dialog.open(CreateUsuarioComponent, {
            width: '400px',
            data: usuarioToUpdate,
        });

        dialogRef.afterClosed().subscribe(() => {
            this.listarUsuarios();
        });
    }

    listarUsuarios(): void {
        this.usuarioService.listarUsuarios().subscribe((response) => {
            this.dataSource.data = response as Usuario[];
        });
    }

    consultarUsuarioPorId(id: any) {
        this.usuarioService.consultarUsuarioPorId(id).subscribe((response) => {
            this.openDialog(response);
        });
    }

    deletarUsuario(id: any): void {
        this.usuarioService.deletarUsuario(id).subscribe((response) => {
            this.listarUsuarios();
            this.snackService.openSnackbar('Usuário deletado', true);
        });
    }
}
