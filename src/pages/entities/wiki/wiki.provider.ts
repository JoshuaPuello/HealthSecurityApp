import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Wiki } from './wiki.model';

@Injectable()
export class WikiService {
    private resourceUrl = Api.API_URL + '/wikis';

    constructor(private http: HttpClient) { }

    create(wiki: Wiki): Observable<Wiki> {
        return this.http.post(this.resourceUrl, wiki);
    }

    update(wiki: Wiki): Observable<Wiki> {
        return this.http.put(this.resourceUrl, wiki);
    }

    find(id: number): Observable<Wiki> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
