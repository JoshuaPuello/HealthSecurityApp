import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Respuesta } from './respuesta.model';

@Injectable()
export class RespuestaService {
    private resourceUrl = Api.API_URL + '/respuestas';

    constructor(private http: HttpClient) { }

    create(respuesta: Respuesta): Observable<Respuesta> {
        return this.http.post(this.resourceUrl, respuesta);
    }

    update(respuesta: Respuesta): Observable<Respuesta> {
        return this.http.put(this.resourceUrl, respuesta);
    }

    find(id: number): Observable<Respuesta> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
