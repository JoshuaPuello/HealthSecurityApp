import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Categoria } from './categoria.model';

@Injectable()
export class CategoriaService {
    private resourceUrl = Api.API_URL + '/categorias';

    constructor(private http: HttpClient) { }

    create(categoria: Categoria): Observable<Categoria> {
        return this.http.post(this.resourceUrl, categoria);
    }

    update(categoria: Categoria): Observable<Categoria> {
        return this.http.put(this.resourceUrl, categoria);
    }

    find(id: number): Observable<Categoria> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
