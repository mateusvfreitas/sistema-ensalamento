import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AtributoService } from '../atributo/atributo.service';
import { Atributo } from '../atributo/model/atributo';
import { GrupoSalaService } from '../grupo-sala/grupo-sala.service';
import { GrupoSala } from '../grupo-sala/model/grupo-sala';
import { Sala } from '../sala/model/sala';
import { SalaService } from '../sala/sala.service';
import { FILTRO_NOME } from '../utils/filtros';
import { SnackbarService } from '../utils/snackbar.service';

@Component({
    selector: 'app-sala',
    templateUrl: './sala.component.html',
    styleUrls: ['./sala.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            ),
        ]),
    ],
})
export class SalaComponent implements OnInit {
    filtroAtributos = new FormControl([]);
    filtroAgrupamento = new FormControl([]);
    filtroCapacidade = new FormControl();

    capacidadeMinima = 0;
    matchAll = false;

    paramAtributos: Atributo[] = [];
    paramAgrupamento: GrupoSala[] = [];
    paramCapacidadeMinima!: number;
    paramMatchAll!: boolean;

    columnsToDisplay: string[] = [
        'nome',
        'capacidade',
        'grupoSala',
        'atributosResumidos',
    ];
    textoTooltip = 'Qualquer: sei lá&#13;Todos: sei lá';

    seila() {
        return 'Qualquer: sei lá\nTodos: sei lá';
    }
    columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    expandedElement!: Sala | null;
    dataSource = new MatTableDataSource<Sala>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    listaAtributos: Atributo[] = [];
    listaAgrupamentos: GrupoSala[] = [];

    constructor(
        public dialog: MatDialog,
        private snackService: SnackbarService,
        private salaService: SalaService,
        private atributoService: AtributoService,
        private grupoSalaService: GrupoSalaService
    ) {}

    ngOnInit(): void {
        this.listarSalas();
        this.listarAtributos();
        this.listarAgrupamentos();
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

    openDialog(salaToUpdate: any) {
        console.log('BOTAO CLICADO');
        console.log(this.dataSource.data);
        // const dialogRef = this.dialog.open(CreateSalaComponent, {
        //     width: '400px',
        //     data: salaToUpdate,
        // });
        // dialogRef.afterClosed().subscribe(() => {
        //     this.listarSalas();
        // });
    }

    filtrar(): void {
        this.paramAtributos = this.filtroAtributos.value as Atributo[];
        // this.paramCapacidadeMinima = this.capacidadeMinima;
        this.paramCapacidadeMinima = this.filtroCapacidade.value as number;
        this.paramAgrupamento = this.filtroAgrupamento.value as GrupoSala[];
        this.paramMatchAll = this.matchAll;

        this.listarSalas();
    }

    listarSalas(): void {
        this.salaService
            .listarSalasFiltros(
                this.paramAtributos,
                this.paramCapacidadeMinima,
                this.paramAgrupamento,
                this.paramMatchAll
            )
            .subscribe((response) => {
                this.dataSource.data = response as Sala[];
                FILTRO_NOME.filtrarPorTexto(this.dataSource);
            });
    }

    listarAtributos(): void {
        this.atributoService.listarAtributos().subscribe((response) => {
            this.listaAtributos = response;
            this.listaAtributos.sort((a, b) => (a.nome < b.nome ? -1 : 1));
        });
    }

    listarAgrupamentos(): void {
        this.grupoSalaService.listarGrupos().subscribe((response) => {
            this.listaAgrupamentos = response;
            this.listaAgrupamentos.sort((a, b) => (a.nome < b.nome ? -1 : 1));
        });
    }

    consultarSalaPorId(id: any) {
        console.log('CONSULTAR ID SALA');
        // this.salaService.consultarSalaPorId(id).subscribe((response) => {
        //     this.openDialog(response);
        // });
    }

    deletarSala(id: any): void {
        // this.salaService.deletarSala(id).subscribe((response) => {
        //     this.listarSalas();
        //     this.snackService.openSnackbar('Usuário deletado', true);
        // });
        console.log('DELETAR SALA');
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
