// export class Filtros {
//     export const
// }

export const FILTRO_TEXTO = {
    filtrarPorNome: (dataSource: any) => {
        dataSource.filterPredicate = (record: any, filter: string) => {
            return record.nome
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase());
        };
    },
    filtrarPorDisciplina: (dataSource: any) => {
        dataSource.filterPredicate = (record: any, filter: string) => {
            return record.disciplina
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase());
        };
    },
};
