import { BaseEntity } from './../../../models';

export class TipoRiesgo implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: any,
        public respuestas?: BaseEntity[],
    ) {
    }
}
