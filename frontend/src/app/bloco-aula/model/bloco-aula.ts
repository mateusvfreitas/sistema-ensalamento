import { Atributo } from 'src/app/atributo/model/atributo';
import { Curso } from 'src/app/curso/model/curso';
import { HorarioAula } from 'src/app/horario/model/horario-aula';
import { Sala } from 'src/app/sala/model/sala';
import { DiaSemana } from 'src/app/utils/dia-semana';

export interface BlocoAula {
    id: number;
    disciplina: string;
    turma: string;
    curso: Curso;
    diaSemana: DiaSemana;
    horarioInicio: HorarioAula;
    horarioFim: HorarioAula;
    salaEspecifica: Sala;
    salaAtual: Sala;
    atributosSala: Atributo[];
}
