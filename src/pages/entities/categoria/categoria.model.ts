import { BaseEntity } from './../../../models';

export class Categoria implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: any,
        public wikis?: BaseEntity[],
    ) {
    }
}
