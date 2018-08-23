import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { AreaRiesgo } from './area-riesgo.model';

@Injectable()
export class AreaRiesgoService {
    private resourceUrl = Api.API_URL + '/area-riesgos';

    constructor(private http: HttpClient) { }

    create(areaRiesgo: AreaRiesgo): Observable<AreaRiesgo> {
        return this.http.post(this.resourceUrl, areaRiesgo);
    }

    update(areaRiesgo: AreaRiesgo): Observable<AreaRiesgo> {
        return this.http.put(this.resourceUrl, areaRiesgo);
    }

    find(id: number): Observable<AreaRiesgo> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
