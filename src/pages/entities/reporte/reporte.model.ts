import { BaseEntity } from './../../../models';

export const enum ValoracionEnum {
    'LEVE',
    'MODERADO',
    'CRITICO'
}

export const enum LugarEventoEnum {
    'DENTRO_EMPRESA',
    'FUERA_EMPRESA'
}

export const enum TipoEventoEnum {
    'ACCIDENTE',
    'INCIDENTE'
}

export class Reporte implements BaseEntity {
    constructor(
        public id?: number,
        public valoracion?: ValoracionEnum,
        public nombre?: string,
        public descripcion?: any,
        public accinones_realizadas?: any,
        public evidenciaContentType?: string,
        public evidencia?: any,
        public lugar_evento?: LugarEventoEnum,
        public tipo_evento?: TipoEventoEnum,
        public bLabores?: boolean,
        public bReportado?: boolean,
        public respuesta?: BaseEntity,
    ) {
        this.bLabores = false;
        this.bReportado = false;
    }
}
