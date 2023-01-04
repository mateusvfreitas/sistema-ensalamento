// export class Filtros {
//     export const
// }

export const FILTRO_NOME = {
    filtrarPorTexto: (dataSource: any) => {
        dataSource.filterPredicate = (record: any, filter: string) => {
            return record.nome
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase());
        };
    },
};
