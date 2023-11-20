import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServices } from '../models/api-services.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    private readonly API_URL = 'http://localhost:8085';

    constructor(
        private http: HttpClient
    ) { }

    public get<T = unknown>(service: ApiServices, route: string, params?: any): Observable<T> {
        return this.http.get(`${this.API_URL}/${service}/${route}`, { params }) as Observable<T>;
    }

    public post<T = unknown>(service: ApiServices, route: string, body: any): Observable<T> {
        return this.http.post(`${this.API_URL}/${service}/${route}`, body) as Observable<T>;
    }

}
