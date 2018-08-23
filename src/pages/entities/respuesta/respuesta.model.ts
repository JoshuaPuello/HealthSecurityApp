import { BaseEntity } from './../../../models';

export const enum ValoracionEnum {
    'LEVE',
    'MODERADO',
    'CRITICO'
}

export const enum EstadoEnum {
    'PENDIENTE',
    'ACEPTADO',
    'RECHAZADO'
}

export class Respuesta implements BaseEntity {
    constructor(
        public id?: number,
        public valoracion?: ValoracionEnum,
        public descripcion?: any,
        public estado?: EstadoEnum,
        public reporte?: BaseEntity,
        public areaRiesgos?: BaseEntity[],
        public tipoRiesgos?: BaseEntity[],
    ) {
    }
}
