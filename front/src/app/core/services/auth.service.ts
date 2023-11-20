import { Injectable } from '@angular/core';
import { ApiServices } from '../models/api-services.enum';
import { ApiService } from './api.service';
import { Observable, lastValueFrom, BehaviorSubject, map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthentificationResponse } from '../models/dto/auth/responses/authentification-response.interface';
import { User } from '../models/user.interface';
import { MeRequest } from '../models/dto/auth/requests/me-request.interface';
import { RegisterRequest } from '../models/dto/auth/requests/register-request.interface';
import { LoginRequest } from '../models/dto/auth/requests/login-request.interface';
import { UserDetailsResponse } from '../models/dto/auth/responses/user-details-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private readonly SERVICE = ApiServices.USER;
    private readonly BASE_ROUTE = 'auth';

    private readonly _userInfo$ = new BehaviorSubject<User|null>(null);
    public readonly isLoggedIn$ = this._userInfo$.pipe(map(userInfo => !!userInfo));

    constructor(
        private api: ApiService,
        private cookie: CookieService
    ) { }

    private buildRoute(action: string){
        return this.BASE_ROUTE + '/' + action;
    }

    private get<T = unknown>(action: string, params?: unknown): Observable<T> {
        return this.api.get<T>(this.SERVICE, this.buildRoute(action), params);
    }

    private post<T = unknown>(action: string, body: unknown): Observable<T> {
        return this.api.post<T>(this.SERVICE, this.buildRoute(action), body);
    }

    private saveToken(token: string){
        this.cookie.set('token', token, 30, '/', '', false, 'Lax');
        return token;
    }

    private async me(): Promise<User|null>{
        const res = await lastValueFrom(this.get<UserDetailsResponse>("me"));
        this._userInfo$.next(res);
        return this._userInfo$.value;
    }

    public getToken(){
        return this.cookie.get('token');
    }

    public async register(registerReq: RegisterRequest): Promise<boolean>{
        const res = await lastValueFrom(this.post<AuthentificationResponse>("register", registerReq));
        this.saveToken(res.token);
        await this.me();
        return this.isLoggedIn;
    }

    public async login(loginReq: LoginRequest): Promise<boolean>{
        const res = await lastValueFrom(this.post<AuthentificationResponse>("login", loginReq));
        this.saveToken(res.token);
        await this.me();
        return this.isLoggedIn;
    }

    public logOut(){
        this.cookie.delete('token', '/');
        this._userInfo$.next(null);
    }

    public tryAutoLogin(){
        console.log("tryAutoLogin", this.isLoggedIn);
        if(this.isLoggedIn){ return Promise.resolve(this._userInfo$.value); }

        if(!this.getToken()){
            return Promise.resolve(null);
        }

        return this.me();
    }

    public setUserInfo(userInfo: User){
        this._userInfo$.next(userInfo);
    }

    public get isLoggedIn(){ return !!this._userInfo$.value; }
    public get userData(){ return this._userInfo$.value; }
    public get userInfo$(){ return this._userInfo$.asObservable(); }

}
