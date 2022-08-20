import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CreateUsuarioComponent } from './create/create-usuario.component';

import { Usuario } from './model/usuario';
import { UsuarioService } from './usuario.service';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
    displayedColumns: string[] = ['nome', 'email'];
    listaUsuarios = new MatTableDataSource<Usuario>();

    constructor(
        public dialog: MatDialog,
        private usuarioService: UsuarioService
    ) {}

    ngOnInit(): void {
        this.listarUsuarios();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.listaUsuarios.filter = filterValue.trim().toLowerCase();
    }

    openDialog(usuarioToUpdate: any) {
        // console.log(idUsuario);
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
            this.listaUsuarios.data = response as Usuario[];
        });
    }

    deletarUsuario(id: any): void {
        this.usuarioService.deletarUsuario(id).subscribe((response) => {
            this.listarUsuarios();
        });
    }
}
