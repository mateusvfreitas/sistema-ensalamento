import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AtributoService } from '../atributo/atributo.service';
import { Atributo } from '../atributo/model/atributo';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/model/curso';
import { HorarioService } from '../horario/horario.service';
import { HorarioAula } from '../horario/model/horario-aula';
import { Sala } from '../sala/model/sala';
import { SalaService } from '../sala/sala.service';
import { DiaSemana } from '../utils/dia-semana';
import { FILTRO_TEXTO } from '../utils/filtros';
import { SnackbarService } from '../utils/snackbar.service';
import { BlocoAulaModalComponent } from './bloco-aula-modal/bloco-aula-modal.component';
import { BlocoAulaService } from './bloco-aula.service';
import { BlocoAula } from './model/bloco-aula';

@Component({
    selector: 'app-bloco-aula',
    templateUrl: './bloco-aula.component.html',
    styleUrls: ['./bloco-aula.component.scss'],
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
export class BlocoAulaComponent implements OnInit {
    columnsToDisplay: string[] = [
        'curso',
        'disciplina',
        'turma',
        'atributos',
        'diaSemana',
        'horarioInicio',
        'horarioFim',
        'salaEspecifica',
        'salaAtual',
        'moreActions',
    ];

    columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];
    expandedElement!: BlocoAula | null;
    dataSource = new MatTableDataSource<BlocoAula>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    listaAtributos: Atributo[] = [];
    listaCursos: Curso[] = [];
    listaHorarios: HorarioAula[] = [];
    listaSalas: Sala[] = [];

    constructor(
        public dialog: MatDialog,
        private snackService: SnackbarService,
        private blocoAulaService: BlocoAulaService,
        private atributoService: AtributoService,
        private cursoService: CursoService,
        private horarioService: HorarioService,
        private salaService: SalaService
    ) {}

    ngOnInit(): void {
        this.listarBlocosAula();
        this.listarAtributos();
        this.listarCursos();
        this.listarHorarios();
        this.listarSalas();
    }

    ngAfterViewInit() {
        this.setSort({ active: 'curso', direction: 'asc' });
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    openDialog(blocoToUpdate: any) {
        // console.log('BOTAO CLICADO');
        // console.log(this.dataSource.data);
        this.atributoService.setAtributos(this.listaAtributos);
        this.cursoService.setCursos(this.listaCursos);
        this.horarioService.setHorarios(this.listaHorarios);
        this.salaService.setSalas(this.listaSalas);
        const dialogRef = this.dialog.open(BlocoAulaModalComponent, {
            width: '700px',
            data: blocoToUpdate,
        });
        dialogRef.afterClosed().subscribe(() => {
            this.listarBlocosAula();
        });
    }

    listarBlocosAula(): void {
        this.blocoAulaService.listarBlocosAula().subscribe((response) => {
            this.dataSource.data = response as BlocoAula[];
            FILTRO_TEXTO.filtrarPorDisciplina(this.dataSource);
        });
    }

    listarAtributos(): void {
        this.atributoService.listarAtributos().subscribe((response) => {
            this.listaAtributos = response;
            this.listaAtributos.sort((a, b) => (a.nome < b.nome ? -1 : 1));
        });
    }

    listarCursos(): void {
        this.cursoService.listarCursos().subscribe((response) => {
            this.listaCursos = response;
            this.listaCursos.sort((a, b) => (a.nome < b.nome ? -1 : 1));
        });
    }

    listarHorarios(): void {
        this.horarioService.listarHorarios().subscribe((response) => {
            this.listaHorarios = response;
            this.listaHorarios.sort((a, b) => (a.nome < b.nome ? -1 : 1));
        });
    }

    listarSalas(): void {
        this.salaService.listarSalas().subscribe((response) => {
            this.listaSalas = response;
            this.listaSalas.sort((a, b) => (a.nome < b.nome ? -1 : 1));
        });
    }

    consultarBlocoAulaPorId(id: any) {
        this.blocoAulaService
            .consultarBlocoAulaPorId(id)
            .subscribe((response) => {
                this.openDialog(response);
            });
    }

    deletarSala(id: any): void {
        this.blocoAulaService.deletarBlocoAula(id).subscribe((response) => {
            this.listarBlocosAula();
            this.snackService.openSnackbar('Sala deletada', true);
        });
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

    getDiaSemana(diaSemana: DiaSemana): string {
        return DiaSemana[diaSemana];
    }
}
