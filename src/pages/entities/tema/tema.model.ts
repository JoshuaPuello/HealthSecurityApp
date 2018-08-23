import { BaseEntity } from './../../../models';

export class Tema implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: any,
        public wikis?: BaseEntity[],
    ) {
    }
}
