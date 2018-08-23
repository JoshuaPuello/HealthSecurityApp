import { BaseEntity } from './../../../models';

export class Wiki implements BaseEntity {
    constructor(
        public id?: number,
        public titulo?: string,
        public imagenContentType?: string,
        public imagen?: any,
        public descripcion?: any,
        public tema?: BaseEntity,
        public categoria?: BaseEntity,
    ) {
    }
}
