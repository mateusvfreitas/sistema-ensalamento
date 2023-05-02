import { Atributo } from 'src/app/atributo/model/atributo';
import { GrupoSala } from 'src/app/grupo-sala/model/grupo-sala';

export interface Sala {
    id: number;
    nome: string;
    capacidade: number;
    isExclusiva: boolean;
    isLiberar: boolean;
    grupoSala: GrupoSala;
    atributos: Atributo[];
}
