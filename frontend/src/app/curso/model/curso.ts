import { Usuario } from 'src/app/usuario/model/usuario';

export interface Curso {
    id: number;
    nome: string;
    usuarios: Usuario[];
}
