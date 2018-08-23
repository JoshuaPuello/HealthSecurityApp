import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { TipoRiesgo } from './tipo-riesgo.model';

@Injectable()
export class TipoRiesgoService {
    private resourceUrl = Api.API_URL + '/tipo-riesgos';

    constructor(private http: HttpClient) { }

    create(tipoRiesgo: TipoRiesgo): Observable<TipoRiesgo> {
        return this.http.post(this.resourceUrl, tipoRiesgo);
    }

    update(tipoRiesgo: TipoRiesgo): Observable<TipoRiesgo> {
        return this.http.put(this.resourceUrl, tipoRiesgo);
    }

    find(id: number): Observable<TipoRiesgo> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
