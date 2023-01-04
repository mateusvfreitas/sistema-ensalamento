import { Atributo } from 'src/app/atributo/model/atributo';

export interface Sala {
    nome: string;
    capacidade: number;
    isExclusiva: boolean;
    isLiberar: boolean;
    atributos: Atributo[];
}
