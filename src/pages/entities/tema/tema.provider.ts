import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Tema } from './tema.model';

@Injectable()
export class TemaService {
    private resourceUrl = Api.API_URL + '/temas';

    constructor(private http: HttpClient) { }

    create(tema: Tema): Observable<Tema> {
        return this.http.post(this.resourceUrl, tema);
    }

    update(tema: Tema): Observable<Tema> {
        return this.http.put(this.resourceUrl, tema);
    }

    find(id: number): Observable<Tema> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
