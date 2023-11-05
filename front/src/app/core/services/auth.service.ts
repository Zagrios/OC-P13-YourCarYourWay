import { Injectable } from '@angular/core';
import { ApiServices } from '../models/api-services.enum';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private readonly SERVICE = ApiServices.USER;
    private readonly ROUTE = 'auth';

    constructor(
        private api: ApiService
    ) { }

    private get<T = unknown>(action: string, params?: any) {
        const route = this.ROUTE + '/' + action;
        return this.api.get<T>(this.SERVICE, route, params);
    }

    public test(): Observable<string[]>{
        return this.get<string[]>('test');
    }

}
