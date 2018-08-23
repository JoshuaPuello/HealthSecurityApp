import { BaseEntity } from './../../../models';

export class AreaRiesgo implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public descripcion?: any,
        public respuestas?: BaseEntity[],
    ) {
    }
}
